# Feature: Modo Offline Real

## Descripción
Implementar persistencia local completa para que la app funcione sin conexión a internet, con sincronización automática cuando se recupere la conexión.

## Estado
🔴 No implementado

Actualmente:
- ✅ Firebase Realtime Database sincroniza en tiempo real
- ❌ No hay persistencia local si no hay internet
- ❌ App no funciona offline
- ❌ No hay cola de sincronización para cambios offline

## Valor
Permitir a los usuarios:
- Usar la app sin conexión a internet
- No perder datos si se pierde la conexión
- Sincronizar automáticamente al recuperar conexión
- Tener mejor performance (lectura local)
- Reducir uso de datos móviles

## Tareas técnicas

### 1. Elegir solución de persistencia local
Opciones:
- [ ] **Opción A**: AsyncStorage (simple, para datos pequeños)
- [ ] **Opción B**: SQLite (mejor para queries complejas)
- [ ] **Opción C**: Realm (ORM moderno, sincronización)
- [ ] **Recomendación**: SQLite + expo-sqlite

### 2. Implementar capa de persistencia local
- [ ] Crear `lib/services/LocalStorageService.js`:
  ```javascript
  // CRUD operations en SQLite local
  - createTables()
  - saveLists(lists)
  - getLists()
  - saveItem(listName, item)
  - deleteItem(listName, itemName)
  - clearAll()
  ```

### 3. Implementar cola de sincronización
- [ ] Crear `lib/services/SyncService.js`:
  - Cola de operaciones pendientes (create, update, delete)
  - Detectar estado de conectividad
  - Procesar cola cuando hay conexión
  - Resolver conflictos (last-write-wins o merge)
  - Eventos de sincronización (onSyncStart, onSyncComplete, onSyncError)

### 4. Modificar DatabaseService
- [ ] Actualizar `lib/services/DatabaseService.js`:
  - Agregar lógica offline-first:
    - Escribir primero en local
    - Agregar a cola de sincronización
    - Intentar sincronizar con Firebase
  - Modo: `LOCAL_ONLY`, `REMOTE_ONLY`, `SYNC`

### 5. Implementar detector de conectividad
- [ ] Crear `lib/hooks/useNetworkStatus.js`:
  - Usar `@react-native-community/netinfo`
  - State: isConnected, isInternetReachable
  - Trigger sincronización al recuperar conexión

### 6. UI: Indicadores de estado
- [ ] Agregar en la UI:
  - Badge de "Modo Offline" en el header
  - Indicador de sincronización en progreso
  - Indicador de items pendientes de sincronizar
  - Toast cuando se completa sincronización

### 7. Migración de datos existentes
- [ ] Script de migración:
  - Descargar datos actuales de Firebase
  - Guardar en SQLite local
  - Verificar integridad

## Arquitectura propuesta

```
User Action
    ↓
LocalStorageService.save()  ← Siempre exitoso (offline-first)
    ↓
SyncQueue.add(operation)     ← Agregar a cola
    ↓
NetworkStatus.isConnected?
    ↓
[YES] → FirebaseService.sync() → Remove from queue
[NO]  → Wait for connection   → Retry later
```

## Archivos afectados
- `package.json` (nuevas deps: expo-sqlite, @react-native-community/netinfo)
- Nueva: `lib/services/LocalStorageService.js`
- Nueva: `lib/services/SyncService.js`
- Modificar: `lib/services/DatabaseService.js`
- Nueva: `lib/hooks/useNetworkStatus.js`
- Modificar: `lib/Context.jsx` (agregar sync state)
- Todos los hooks que usan DatabaseService

## Dependencias
```bash
expo install expo-sqlite
npm install @react-native-community/netinfo
```

## Consideraciones
- **Conflictos de sincronización**: Usar timestamp para resolver (last-write-wins)
- **Tamaño de DB local**: Implementar límite y cleanup de items antiguos
- **Testing**: Probar modo avión, conexión intermitente, cambios simultáneos
- **Performance**: Indexar SQLite para queries rápidas
- **Seguridad**: Encriptar datos sensibles en local (si hay notas privadas)

## Prioridad
⭐⭐ Media (nice-to-have, Firebase ya maneja mucho de esto automáticamente)

## Notas adicionales
Firebase Realtime Database ya tiene cierta persistencia local automática, pero:
- Es limitada (cache)
- No es confiable 100% offline
- No hay control sobre la cola de sincronización
- Esta implementación daría control total
