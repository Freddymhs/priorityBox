# Feature: Notas y Reflexiones para cada Ítem

## Descripción
Permitir a los usuarios agregar notas, reflexiones y contexto a cada elemento para facilitar la toma de decisiones conscientes.

## Estado
🔴 No implementado

## Valor
Ayudar a los usuarios a:
- Registrar por qué quieren/necesitan algo
- Anotar reflexiones mientras pasa el tiempo
- Documentar cambios de prioridad
- Revisar su proceso de pensamiento antes de comprar
- Practicar el consumo consciente

## Tareas técnicas

### 1. Modificar el modelo de datos
- [ ] Agregar campos al Item:
  ```javascript
  {
    name: string,
    priority: string,
    type: string,
    // NUEVOS CAMPOS
    description: string,                 // Descripción inicial
    notes: Array<{                       // Array de reflexiones
      id: string,
      text: string,
      createdAt: Date,
      mood: 'thinking' | 'doubt' | 'convinced' // Estado emocional
    }>,
    createdAt: Date,                     // Cuándo se agregó el ítem
    lastReviewedAt: Date | null,         // Última vez que se revisó
  }
  ```

### 2. Actualizar servicios
- [ ] Modificar `lib/services/ItemService.js`:
  - Actualizar `createItem()` para incluir timestamp y descripción
  - Agregar método `addNote(listName, itemName, noteText, mood)`
  - Agregar método `updateLastReviewed(listName, itemName)`
  - Agregar método `getNotes(listName, itemName)`

### 3. Actualizar UI - ModalAddItem
- [ ] Modificar `AppArea/Screens/HomeSection/ModalAddItem.jsx`:
  - Agregar TextArea para descripción inicial
  - Placeholder: "¿Por qué necesitas/quieres esto?"
  - Character limit: 500 caracteres

### 4. Nueva pantalla: Detalle del Item
- [ ] Crear `AppArea/Screens/HomeSection/ItemDetailModal.jsx`:
  - Mostrar información completa del item
  - Timeline de notas y reflexiones
  - Botón "Agregar reflexión"
  - Indicador de tiempo transcurrido desde creación
  - Estado emocional (iconos: 🤔 pensando, 🤷 dudando, ✅ convencido)

### 5. Actualizar UI - Matriz
- [ ] Modificar `AppArea/Screens/HomeSection/Matriz.jsx`:
  - Al hacer tap en un item, abrir ItemDetailModal
  - Mostrar indicador si el item tiene notas (ícono 📝)
  - Mostrar badge con número de días desde creación

### 6. Feature: Recordatorios de revisión
- [ ] Crear sistema de notificaciones:
  - Recordar revisar items después de 7, 14 y 30 días
  - Notificación local: "¿Sigues necesitando X?"
  - Usar expo-notifications

## Archivos afectados
- `lib/services/ItemService.js`
- `lib/hooks/useItems.js`
- `AppArea/Screens/HomeSection/ModalAddItem.jsx`
- `AppArea/Screens/HomeSection/Matriz.jsx`
- Nueva: `AppArea/Screens/HomeSection/ItemDetailModal.jsx`
- Nueva: `lib/hooks/useNotifications.js`

## Consideraciones
- Las notas son privadas y sensibles (no compartir con analytics)
- Implementar auto-save mientras el usuario escribe
- Permitir editar/eliminar notas
- Considerar formato markdown básico (bold, italic)
- Backup de notas en Firebase

## Prioridad
⭐⭐⭐ Alta (core del concepto de "compra consciente")
