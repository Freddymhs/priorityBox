# Feature: Autenticación de Usuarios

## Descripción
Implementar sistema de autenticación para que múltiples usuarios puedan usar la app con sus propios datos aislados.

## Estado
🔴 No implementado

Actualmente:
- Todos usan la misma base de datos compartida
- No hay login/logout
- No hay cuentas de usuario
- Datos no están aislados por usuario

## ⚠️ Motivación principal: SEGURIDAD
La `databaseURL` y `apiKey` de Firebase están en `lib/init-firebase.js` (commiteadas en git). Sin Auth + Rules restrictivas, **cualquier persona que vea la URL puede leer, escribir o borrar `/listas` enteras**. Hoy mitigado solo por "obscuridad" (nadie tiene la URL excepto el dueño del repo). Cualquier distribución pública del código expone los datos. Las apiKeys de Firebase Web son identificadores públicos por diseño — su seguridad depende 100% de las Security Rules del proyecto.

## Valor
- **Cierra el agujero de seguridad** (motivación principal)
- Múltiples usuarios en el mismo dispositivo
- Sincronización multi-dispositivo por usuario
- Privacidad de datos personales
- Backup automático en la nube
- Preparar para features sociales futuras

## Tareas técnicas

### 1. Implementar Firebase Authentication
- [ ] Configurar Firebase Auth en el proyecto
- [ ] Métodos de autenticación:
  - Email/Password
  - Google Sign-In
  - Apple Sign-In (iOS)
  - Anónimo (para probar sin cuenta)

### 2. Crear pantallas de autenticación
- [ ] Crear `AppArea/Screens/AuthSection/`:
  - `LoginScreen.jsx`
  - `SignupScreen.jsx`
  - `ForgotPasswordScreen.jsx`
  - `ProfileScreen.jsx`

### 3. Modificar estructura de datos en Firebase
Cambiar de:
```
/listas
  /salud
  /casa
```

A:
```
/users
  /{userId}
    /listas
      /salud
      /casa
    /profile
      name
      email
      createdAt
```

### 4. Implementar AuthContext
- [ ] Crear `lib/AuthContext.jsx`:
  - State: user, isLoading, isAuthenticated
  - Methods: login(), signup(), logout(), resetPassword()
  - Persistir sesión con AsyncStorage

### 5. Proteger rutas
- [ ] Modificar `AppArea/Navigator/index.jsx`:
  - Stack Navigator condicional
  - Si no hay user → AuthStack
  - Si hay user → AppStack (actual)

### 6. Actualizar servicios
- [ ] Modificar `lib/services/DatabaseService.js`:
  - Todas las rutas deben incluir userId
  - Ejemplo: `/users/${userId}/listas`

### 7. Agregar pantalla de perfil
- [ ] Crear ProfileScreen:
  - Ver datos de usuario
  - Cambiar contraseña
  - Logout
  - Eliminar cuenta

## Archivos afectados
- `lib/init-firebase.js` (agregar Auth)
- Nueva: `lib/AuthContext.jsx`
- Nueva carpeta: `AppArea/Screens/AuthSection/`
- Modificar: `AppArea/Navigator/index.jsx`
- Modificar: `lib/services/DatabaseService.js`
- Modificar: Todos los servicios para incluir userId
- Modificar: `App.js` (wrap con AuthProvider)

## Dependencias
```bash
# Ya instalado: firebase
# Agregar para social login:
expo install expo-auth-session expo-crypto
expo install @react-native-google-signin/google-signin
```

## Migración de datos existentes
- [ ] Script para migrar datos de root a un usuario demo
- [ ] Opción de importar datos existentes al crear cuenta

## Consideraciones
- **Seguridad**: Reglas de Firebase para proteger datos por usuario
- **UX**: Permitir modo "prueba" sin cuenta (auth anónimo)
- **Privacidad**: GDPR compliance, permitir exportar/eliminar datos
- **Testing**: Crear usuarios de prueba
- **Costos**: Firebase Auth es gratis hasta 10k MAU

## Prioridad
🔥 Alta (⭐⭐⭐) — el riesgo de seguridad debería subirla a P0 si la app se distribuye o el repo se hace público. Mantener en P-Media solo mientras sea uso personal con la URL oculta.
