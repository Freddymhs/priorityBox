# Feature: Exportar Datos

## Descripción
Permitir a los usuarios exportar sus listas y estadísticas en formatos estándar (CSV, JSON, PDF) para análisis externo o backup.

## Estado
🔴 No implementado

## Valor
- Backup manual de datos importantes
- Análisis en Excel/Sheets
- Compartir listas (imprimir, email)
- Transparencia de datos (GDPR)
- Portabilidad a otras apps

## Tareas técnicas

### 1. Implementar exportación CSV
- [ ] Crear `lib/utils/exportUtils.js`:
  - `exportToCSV(lists)` → Archivo CSV con todas las listas
  - Columnas: Lista, Item, Tipo, Prioridad, Presupuesto, Fecha Creación
  - Usar `react-native-fs` para guardar archivo

### 2. Implementar exportación JSON
- [ ] Agregar `exportToJSON(lists)`:
  - Formato completo con toda la estructura
  - Útil para backup/restore
  - Incluir metadata (versión de app, fecha export)

### 3. Implementar exportación PDF
- [ ] Agregar `exportToPDF(lists)`:
  - Usar `react-native-html-to-pdf`
  - Template con logo y branding
  - Matriz visual imprimible
  - Incluir estadísticas si existen

### 4. Crear pantalla de exportación
- [ ] Crear `AppArea/Screens/SettingsSection/ExportScreen.jsx`:
  - Botón "Exportar a CSV"
  - Botón "Exportar a JSON"
  - Botón "Exportar a PDF"
  - Indicador de progreso
  - Compartir archivo después de exportar

### 5. Integrar con share nativo
- [ ] Usar `expo-sharing`:
  - Permitir compartir archivo por email, WhatsApp, Drive
  - Guardar en sistema de archivos local
  - Copiar a clipboard (JSON pequeño)

### 6. Feature: Importar datos
- [ ] Agregar `importFromJSON(fileUri)`:
  - Validar formato
  - Merge con datos existentes
  - Evitar duplicados
  - Mostrar preview antes de importar

## Archivos afectados
- Nueva: `lib/utils/exportUtils.js`
- Nueva: `AppArea/Screens/SettingsSection/ExportScreen.jsx`
- Modificar: `AppArea/Navigator/index.jsx` (agregar Settings tab)

## Dependencias
```bash
expo install expo-sharing expo-file-system
npm install react-native-html-to-pdf
```

## Ejemplo de CSV exportado
```csv
Lista,Item,Tipo,Prioridad,Presupuesto,Fecha Creación
Salud,Tomar vitaminas,Deseo,Alta,50.00,2025-01-10
Casa,Cambiar cables,Necesidad,Alta,150.00,2025-01-05
```

## Consideraciones
- **Privacidad**: Advertir que el archivo contiene datos sensibles
- **Formato**: Usar UTF-8 para caracteres especiales
- **Performance**: Streaming para listas grandes
- **UX**: Confirmación antes de exportar
- **Testing**: Probar con listas vacías, muy grandes, caracteres especiales

## Prioridad
⭐ Baja (nice-to-have, no crítico para experiencia base)
