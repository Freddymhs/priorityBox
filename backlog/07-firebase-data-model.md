# Feature: Rediseñar modelo de datos Firebase (concurrencia + real-time)

## Descripción
Tres problemas relacionados con cómo la app usa Firebase Realtime Database. Funcionan bien hoy desde un solo dispositivo, pero todos rompen o degradan UX bajo uso concurrente (multi-dispositivo del mismo usuario, futura colaboración, etc.).

## Estado
🔴 No implementado

## ⚠️ Cuándo importa esto
- Hoy: **uso personal, un solo dispositivo a la vez** → todo funciona.
- Mañana: **multi-dispositivo, colaboración, o frecuencia alta de cambios** → aparecen lost-updates, listas duplicadas, ítems perdidos al borrar concurrente, y UI desincronizada.

## Los 3 problemas

### Problema 1 — Items como array indexado
**Archivo:** `lib/services/ItemService.js:24` (`addToList`), `:42-55` (`deleteFromList`)

```js
// Actual:
const newPosition = currentItems.length;
await DatabaseService.set(`${LISTS_PATH}/${listName}/items/${newPosition}`, item);
```

- Usar `currentItems.length` como índice es race condition: si dos dispositivos agregan a la vez, **uno sobrescribe al otro** (lost write).
- Al borrar items, hay que reindexar todo el array (`reindexedItems[index] = item`).
- Sin ID estable: no podés referenciar un item por clave; se compara por `item.name`, lo que rompe si dos items tienen el mismo nombre en una lista.

**Fix:** usar `push(ref)` para que Firebase genere keys únicas. Items pasan a ser `{ pushKey1: {name,type,priority}, pushKey2: {...} }`.

### Problema 2 — `set()` reescribe árbol completo
**Archivo:** `lib/services/ListService.js:43, 59`, `lib/services/ItemService.js:90`

```js
// Actual:
await DatabaseService.set(LISTS_PATH, updatedLists);  // ← reescribe TODO /listas
```

- Si dos clientes editan en paralelo, el último gana (lost-update).
- Transferencia de payload entero por cada cambio.

**Fix:** usar `update()` con paths granulares (`/listas/${listName}/items/${pushKey}`) o `runTransaction()` para operaciones derivadas del estado anterior.

### Problema 3 — RTDB usada como REST (no real-time)
**Archivo:** `lib/services/DatabaseService.js:6-16` (`get` con `onlyOnce: true`), `lib/Context.jsx:12-30`

- `DatabaseService.get()` usa `onValue` con `{ onlyOnce: true }` → one-shot, no suscribe.
- `DataProvider` recarga manualmente vía `refetchBoxData` después de cada mutación → cada hook (`useItems`, `useLists`) tiene que recordar invocarlo.
- **Inconsistencia con README**: el backlog y el README dicen "Sincronización en tiempo real con Firebase" — no lo es.

**Fix:** usar `DatabaseService.subscribe()` (ya existe en `DatabaseService.js:33`) dentro de un `useEffect` con cleanup en `DataProvider`. Elimina la necesidad de `refetchBoxData` en cada hook.

## Tareas técnicas

### 1. Migrar items array → push keys (Problema 1)
- [ ] Cambiar `addToList` para usar `push(ref(db, ...))` y guardar `{[pushKey]: item}`
- [ ] Cambiar `deleteFromList` para usar el `pushKey` (recibir como parámetro, no buscar por name)
- [ ] Actualizar `categorizeItemsByQuadrant` en `lib/utils/matrixUtils.js` para iterar objetos en lugar de arrays
- [ ] Actualizar UI: `Matriz.jsx`, `ListOfLists.jsx` para pasar `pushKey` al borrar
- [ ] **Migración**: script una-vez que convierta `items: [{...}, {...}]` → `items: {key1: {...}, key2: {...}}` en datos existentes

### 2. Reemplazar `set()` por `update()` granular (Problema 2)
- [ ] `ListService.create` → `update({ [`${LISTS_PATH}/${name}`]: { description, items: {} } })`
- [ ] `ListService.delete` → `remove(ref(db, `${LISTS_PATH}/${name}`))`
- [ ] `ItemService.addToList` → ya cubierto por el fix del Problema 1 (push key específico)
- [ ] `ItemService.deleteFromList` → `remove(ref(db, `${LISTS_PATH}/${name}/items/${pushKey}`))`
- [ ] `ItemService.deleteFromAllLists` → usar `update()` con multi-path para borrar atómicamente

### 3. Cambiar a `subscribe()` real-time (Problema 3)
- [ ] En `DataProvider`, sustituir el `useEffect` actual:
  ```js
  // Reemplazar fetchData/refetchBoxData por:
  useEffect(() => {
    const unsubscribe = DatabaseService.subscribe(LISTS_PATH, (data) => {
      setBoxData(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  ```
- [ ] Eliminar `refetchBoxData` del context value
- [ ] Eliminar llamadas a `onRefresh` / `refetchBoxData` en `useItems.js` y `useLists.js` (la sincronización viene del subscribe)

## Archivos afectados
- `lib/services/ItemService.js` (Problemas 1 y 2)
- `lib/services/ListService.js` (Problema 2)
- `lib/services/DatabaseService.js` (Problema 3 — verificar API de `subscribe`)
- `lib/Context.jsx` (Problema 3)
- `lib/hooks/useItems.js` (eliminar onRefresh)
- `lib/hooks/useLists.js` (eliminar onRefresh)
- `lib/utils/matrixUtils.js` (iterar objects en lugar de arrays)
- `AppArea/Screens/HomeSection/Matriz.jsx` (pasar pushKey al borrar)
- `AppArea/Screens/ListSection/ListOfLists.jsx` (pasar pushKey al borrar)
- `backlog/README.md` / `README.md` (actualizar la línea "Sincronización en tiempo real" — pasaría a ser REAL)

## Consideraciones
- **Migración de datos**: imprescindible. Sin script de migración, los items existentes con formato array se rompen al cargar con el nuevo formato.
- **Listener cleanup**: el `unsubscribe` del `subscribe()` debe llamarse siempre en el cleanup del `useEffect`. Si se olvida, leak de listeners en cada remount del DataProvider.
- **Coexistencia con Auth (backlog/04)**: si se implementa Auth primero, los paths cambian a `/users/{uid}/listas/...` — coordinar el orden de implementación.
- **Testing**: cada cambio debe probarse con 2 dispositivos en paralelo para validar el comportamiento concurrente (que es justo lo que el actual no soporta).

## Prioridad
🚀 Media (⭐⭐) — Solo si la app empieza a usarse desde múltiples dispositivos o se planea colaboración. Para uso personal de un solo dispositivo, el código actual funciona.

## Dependencia con backlog/04
Si implementamos Auth primero, vale la pena hacer estos 3 fixes en el mismo sprint, porque cualquier cambio de paths Firebase los afecta a todos.
