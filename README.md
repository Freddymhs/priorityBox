# PriorityBox

App de tareas con Matriz de Eisenhower. React Native + Expo + Firebase.

## Setup

```bash
git clone https://github.com/Freddymhs/priorityBox
cd priorityBox
yarn
```

## Ejecutar

```bash
npm run android    # Android
npm run ios        # iOS Simulator
```

## Android (primera vez)

**Requisitos:** ADB, Java 17+, ANDROID_HOME apuntando al SDK, dispositivo Android con depuración USB activa.

```bash
# 1. Verificar que adb ve el dispositivo
adb devices

# 2. Compilar e instalar (DEBUG: necesita Metro corriendo en el PC)
npm run android

# o (RELEASE: app autónoma, NO necesita Metro ni PC tras instalar)
npm run android:release
```

### Debug vs Release

| | Debug (`npm run android`) | Release (`npm run android:release`) |
|---|---|---|
| JS embebido en APK | ❌ se sirve desde Metro | ✅ embebido |
| Necesita Metro/PC tras instalar | ✅ sí | ❌ no |
| Tamaño / velocidad | mayor / lento | menor / rápido |
| Para qué sirve | desarrollar (hot reload, errores verbosos) | usar como app real |

### Workaround MIUI / HyperOS (Xiaomi, Redmi, POCO)

`expo run:android` instala con el flag `adb install --user 0`, que MIUI bloquea con el error `INSTALL_FAILED_USER_RESTRICTED`. Dos pasos para evitarlo:

**1. En el teléfono — Ajustes → Ajustes adicionales → Opciones de desarrollador:**
- Activar **"Instalar vía USB"**
- Activar **"Depuración USB (Ajustes de seguridad)"** si existe
- Si "Instalar vía USB" no se deja activar, desactivar **"Optimización MIUI"** y reiniciar

**2. Si MIUI sigue rechazando, usar `adb install` directo (sin `--user 0`):**

```bash
# Compila el APK debug
npm run android   # va a fallar al instalar — ignora el error, el APK ya está listo

# Instala manualmente (acepta el diálogo en el teléfono)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Arranca Metro y abre la app
npx expo start --dev-client --android
```

### Cambios diarios (Android)

```bash
# Si Metro sigue corriendo: solo guarda los archivos JS (hot reload).
# Si Metro está cerrado:
npx expo start --dev-client --android
```

Para cambios en código nativo (assets, app.json, dependencias nativas): re-ejecutar `npm run android` (o `adb install -r` con el workaround MIUI).

## iPhone (primera vez)

**Requisitos:** Mac con Xcode + Apple ID gratuito (⚠️ app expira cada 7 días)

```bash
# 1. Instalar
yarn
npm run setup:ios

# 2. Configurar signing en Xcode
open ios/priorityBox.xcworkspace
# → Xcode: Signing & Capabilities → Selecciona tu Apple ID

# 3. Compilar e instalar
npm run ios:device
# En iPhone: Ajustes → General → Gestión de dispositivos → Confiar
```

## iPhone (cambios diarios)

```bash
npm run ios:device   # Modo Release (producción)
```

## Debugging en iPhone

Si ves pantalla blanca o la app no funciona:

```bash
# Instalar en modo Debug (verás errores en pantalla)
npm run ios:device:debug

# Ver logs del dispositivo en tiempo real
npm run ios:logs
```

**Troubleshooting:**
- Logs en `ios-install.log`
- Si yarn se cuelga: `rm -rf node_modules && yarn`
- Pantalla blanca: Ejecuta `npm run ios:device:debug` para ver errores

## Firebase

Agrega `google-services.json` en la raíz (descárgalo desde Firebase Console).
