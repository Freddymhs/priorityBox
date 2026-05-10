# Backlog - PriorityBox

Features pendientes y roadmap del proyecto PriorityBox.

## Estado actual del proyecto

✅ **Implementado:**
- Matriz de Eisenhower (4 cuadrantes)
- Gestión de listas personalizadas
- CRUD de items (crear, eliminar, clasificar)
- Sincronización en tiempo real con Firebase
- Guía interactiva del método
- Navegación con tabs
- UI con Native Base

❌ **NO implementado (pero mencionado en CV original):**
- Sistema de gastos y presupuestos
- Notas y reflexiones para items
- Modo offline real con persistencia local

## Roadmap

### 🔥 Prioridad Alta
1. [Gestión y Registro de Gastos](./01-gestion-gastos.md) ⭐⭐⭐
   - Diferenciador clave de la app
   - Permite decisiones financieras informadas

2. [Notas y Reflexiones](./02-notas-reflexiones.md) ⭐⭐⭐
   - Core del concepto de "compra consciente"
   - Facilita reflexión antes de comprar

### 🚀 Prioridad Media
3. [Modo Offline Real](./03-modo-offline.md) ⭐⭐
   - Mejora experiencia de usuario
   - Firebase ya maneja mucho automáticamente

4. [Autenticación de Usuarios](./04-autenticacion-usuarios.md) ⭐⭐
   - Necesario para multi-dispositivo
   - Preparar para escalabilidad

6. [Migrar NativeBase → Gluestack-ui](./06-migrar-nativebase-a-gluestack.md) ⭐⭐
   - NativeBase 3 está deprecado (último release: mar-2023)
   - Elimina parches manuales acumulados en `scripts/patch-native-base.js`
   - Compatibilidad real con New Architecture (Fabric)

### 💡 Prioridad Baja
5. [Exportar Datos](./05-exportar-datos.md) ⭐
   - Nice-to-have
   - Útil para análisis externo

## Cómo usar este backlog

Cada archivo markdown contiene:
- ✅ Descripción del feature
- 🎯 Valor que aporta
- 🛠 Tareas técnicas detalladas
- 📁 Archivos que se verán afectados
- ⚠️ Consideraciones importantes
- 🔢 Prioridad sugerida

## Contribuir

Si decides implementar alguno de estos features:
1. Lee el archivo markdown completo
2. Actualiza el estado en el archivo (🔴 → 🟡 → 🟢)
3. Crea una branch: `feature/nombre-del-feature`
4. Actualiza el README del proyecto principal
5. Actualiza tu CV si el feature es significativo

## Métricas del proyecto

**Líneas de código actuales:** ~2,000 (estimado)

**Tech stack real:**
- React Native 0.81.5
- Expo 54
- Firebase 12.7
- Native Base 3.4
- React Navigation 7

**Próximas decisiones técnicas:**
- SQLite vs AsyncStorage (para offline)
- CSV vs JSON vs PDF (para exportación)
- Email/Password vs Social Auth (para autenticación)
