# Feature: Migrar NativeBase 3 → Gluestack-ui

## Descripción
NativeBase 3.4.28 está oficialmente deprecado (última release: marzo 2023). Su README muestra "⛔️ DEPRECATED - NativeBase ↔ gluestack". El sucesor directo del mismo equipo es **Gluestack-ui**. Migrar elimina deuda técnica recurrente y permite mantener la app actualizada con React Native moderno.

## Estado
🔴 No implementado

## Valor
- **Elimina parches manuales acumulados** en `scripts/patch-native-base.js` (actualmente 2: BackHandler API + outlineWidth en Fabric). Cada upgrade de RN trae un nuevo parche.
- **Compatibilidad real con New Architecture** (Fabric + TurboModules) — NativeBase 3 no se actualiza más para soportarla.
- **Mantenimiento activo** — Gluestack-ui recibe releases regulares.
- **Mejor performance** — Gluestack-ui v2 usa Tailwind-style en lugar de styled-system runtime.

## Tareas técnicas

### 1. Auditar superficie de uso de NativeBase
- [ ] Listar componentes usados (`grep -r "from \"native-base\""`):
  - Detectados: `Box`, `Button`, `Input`, `Modal`, `Select`, `Text`, `View`, `useToast`
  - Archivos: `ModalAddItem.jsx`, `ModalAddList.jsx`, `ListOfLists.jsx`, `Matriz.jsx`, `GuideSection/index.jsx`
- [ ] Mapear cada componente a su equivalente en Gluestack-ui v2

### 2. Instalar Gluestack-ui
- [ ] `npx gluestack-ui init` (o seguir guía oficial)
- [ ] Configurar `GluestackUIProvider` en `App.js` (reemplaza `NativeBaseProvider`)
- [ ] Migrar `lib/nativebase-theme.js` → `gluestack-ui.config.ts`

### 3. Migrar componentes uno por uno
- [ ] `Modal` → `<Modal>` de Gluestack (API similar)
- [ ] `Input` → `<Input>` + `<InputField>` (composición)
- [ ] `Select` → `<Select>` + `<SelectTrigger>` + `<SelectContent>` + `<SelectItem>`
- [ ] `useToast` → `useToast` de Gluestack (API muy similar)
- [ ] `Box`, `Text` → mantener como están o usar primitivos RN

### 4. Eliminar NativeBase
- [ ] Remover `"native-base": "^3.4.28"` de `package.json`
- [ ] Eliminar `lib/nativebase-theme.js`
- [ ] Eliminar `scripts/patch-native-base.js`
- [ ] Eliminar referencia en `package.json` `postinstall`
- [ ] Quitar `NativeBaseProvider` y `LogBox.ignoreLogs([...])` de NativeBase en `App.js`

### 5. Limpieza de warnings silenciados
- [ ] Después de migrar, revisar `LogBox.ignoreLogs` en `App.js:8-13`:
  - `"In React 18, SSRProvider is not necessary"` — viene de NativeBase, se elimina solo
  - `"SafeAreaView has been deprecated"` — revisar si Gluestack lo usa
  - Eliminar entradas obsoletas

## Archivos afectados
- `App.js` (provider + ignoreLogs)
- `lib/nativebase-theme.js` (eliminar)
- `scripts/patch-native-base.js` (eliminar)
- `package.json` (deps + postinstall)
- `AppArea/Screens/HomeSection/ModalAddItem.jsx`
- `AppArea/Screens/HomeSection/Matriz.jsx`
- `AppArea/Screens/ListSection/ModalAddList.jsx`
- `AppArea/Screens/ListSection/ListOfLists.jsx`
- `AppArea/Screens/GuideSection/index.jsx`
- Nuevo: `gluestack-ui.config.ts` (o equivalente)

## Dependencias
```bash
# Quitar
yarn remove native-base

# Instalar (verificar guía oficial actual)
npx gluestack-ui init
# o
yarn add @gluestack-ui/themed @gluestack-style/react
```

## Consideraciones
- **Migración gradual posible**: Gluestack y NativeBase pueden coexistir temporalmente; migrar pantalla por pantalla en commits separados.
- **Theme tokens**: el sistema de tokens cambia (Gluestack usa Tailwind-style). Mapear los colores/espaciados de `lib/constants/theme.js` al nuevo formato.
- **Testing manual**: cada pantalla debe re-verificarse visualmente en Android (donde aparecen los bugs de Fabric) y iOS.
- **No bloqueante**: la app funciona hoy con NativeBase 3 parcheado. La migración es para eliminar deuda, no urgencia.

## Prioridad
🚀 Media (⭐⭐) — Deuda técnica que crece con cada upgrade de RN/Expo. Sin urgencia hoy pero el costo de no hacerla se incrementa con el tiempo.

## Antecedentes (parches acumulados)
1. **2026-01-12** — Patch BackHandler API (RN 0.74+ deprecó `removeEventListener`)
2. **2026-05-10** — Patch `outlineWidth` (RN 0.81 Fabric rechaza strings como Double)
