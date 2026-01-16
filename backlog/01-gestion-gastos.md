# Feature: Gestión y Registro de Gastos

## Descripción
Implementar un sistema completo de presupuestos y registro de gastos para cada ítem, permitiendo al usuario tomar decisiones financieras más informadas.

## Estado
🔴 No implementado

## Valor
Permitir a los usuarios:
- Asignar un presupuesto estimado a cada deseo/necesidad
- Registrar el gasto real cuando se realiza la compra
- Comparar presupuesto vs gasto real
- Ver estadísticas de gastos por lista/categoría
- Tomar decisiones basadas en impacto financiero

## Tareas técnicas

### 1. Modificar el modelo de datos
- [ ] Agregar campos al Item:
  ```javascript
  {
    name: string,
    priority: string,
    type: string,
    // NUEVOS CAMPOS
    budgetAmount: number | null,        // Presupuesto estimado
    actualAmount: number | null,        // Gasto real
    currency: string,                    // "PEN", "USD", etc.
    isPurchased: boolean,                // Indica si ya se compró
    purchaseDate: Date | null,           // Fecha de compra
  }
  ```

### 2. Actualizar servicios
- [ ] Modificar `lib/services/ItemService.js`:
  - Actualizar `validateItem()` para validar campos numéricos
  - Actualizar `createItem()` para incluir campos financieros
  - Agregar método `markAsPurchased(listName, itemName, actualAmount)`

### 3. Actualizar UI - ModalAddItem
- [ ] Agregar inputs en `AppArea/Screens/HomeSection/ModalAddItem.jsx`:
  - Input numérico para presupuesto estimado
  - Select para moneda (PEN, USD, EUR)
  - Validaciones de números positivos

### 4. Actualizar UI - Matriz
- [ ] Modificar `AppArea/Screens/HomeSection/Matriz.jsx`:
  - Mostrar presupuesto en cada item del cuadrante
  - Agregar indicador visual si el item fue comprado
  - Mostrar gasto real vs estimado

### 5. Nueva pantalla: Estadísticas de Gastos
- [ ] Crear `AppArea/Screens/StatsSection/index.jsx`:
  - Total presupuestado por lista
  - Total gastado por lista
  - Comparación presupuesto vs real
  - Gráficos simples (barras o torta)

### 6. Actualizar navegación
- [ ] Agregar nueva tab "Estadísticas" en el bottom navigator

## Archivos afectados
- `lib/services/ItemService.js`
- `lib/hooks/useItems.js`
- `AppArea/Screens/HomeSection/ModalAddItem.jsx`
- `AppArea/Screens/HomeSection/Matriz.jsx`
- `AppArea/Navigator/index.jsx` (nueva tab)
- Nueva carpeta: `AppArea/Screens/StatsSection/`

## Consideraciones
- Mantener compatibilidad con items existentes (campos opcionales)
- Usar formato de moneda local para display
- Considerar multi-currency si el usuario viaja
- Exportar datos a CSV para análisis externo (feature futura)

## Prioridad
⭐⭐⭐ Alta (es un diferenciador clave de la app)
