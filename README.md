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
