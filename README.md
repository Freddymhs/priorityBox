# PriorityBox

App de gestión de tareas con la Matriz de Eisenhower. React Native + Expo + Firebase.

## Setup

```bash
git clone <repo>
cd priorityBox
yarn
cp .env.local.example .env.local   # Configurar credenciales Firebase
```

Edita `.env.local` con tus credenciales de Firebase (las obtienes en Firebase Console > Project Settings).

## Desarrollo

```bash
npm run android     # Android (WayDroid/dispositivo)
npm run ios         # iOS simulator
```

## Build e instalación en Android

```bash
npm run build:android:store        # Genera build-latest.aab (usa .env.local)
npm run install:aab:to:apk:android # Convierte AAB a APK e instala en dispositivo
```

## Build e instalación en iPhone (gratis)

Requiere Mac con Xcode y Apple ID gratuito. **La app expira cada 7 días** (limitación de Apple).

**Primera vez:** Abrir `ios/*.xcworkspace` en Xcode y configurar Signing (tu Apple ID + Bundle ID único).

```bash
npm run build:ios    # Genera proyecto + pods + compila
npm run install:ios  # Compila e instala en iPhone conectado
```

En iPhone: Ajustes → General → VPN y gestión de dispositivos → Confiar

> **Nota:** Tanto desarrollo como build local usan `.env.local`. Solo builds remotos en la nube de EAS usan `eas.json`.

## Pending

- [ ] Separar funciones Firebase
- [ ] Agregar TypeScript
- [ ] Agregar notificaciones
- [ ] Testing en Android
