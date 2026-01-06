#!/bin/bash

# Script para instalar app iOS en dispositivo físico con cuenta gratuita (7 días)
# Requiere: cuenta Apple ID gratuita, dispositivo conectado y en modo desarrollador

set -e

echo "🍎 Instalando PriorityBox en dispositivo iOS físico..."
echo "⏰ Nota: Con cuenta gratuita, la app funcionará por 7 días"

# Verificar que estamos en el directorio correcto
if [ ! -d "ios" ]; then
    echo "❌ Error: No se encuentra el directorio ios/"
    echo "   Ejecuta primero: npm run build:ios"
    exit 1
fi

# Detectar dispositivos conectados
echo "📱 Detectando dispositivos iOS conectados..."
DEVICE_INFO=$(xcrun devicectl list devices | grep "iPhone.*\(available\|connected\)" | head -1)

if [ -z "$DEVICE_INFO" ]; then
    echo "❌ Error: No se detectó ningún iPhone conectado"
    echo "   Asegúrate de que:"
    echo "   - El cable USB esté bien conectado"
    echo "   - Hayas confiado en esta computadora en tu iPhone"
    echo "   - El dispositivo esté desbloqueado"
    exit 1
fi

# Extraer identificador del dispositivo (usar el ID real del dispositivo)
REAL_DEVICE_ID=$(xcrun xctrace list devices | grep "iPhone" | grep -o "([0-9A-F-]*)" | tr -d "()" | head -1)
DEVICE_ID="${REAL_DEVICE_ID:-$(echo "$DEVICE_INFO" | awk '{print $3}')}"
DEVICE_NAME=$(echo "$DEVICE_INFO" | awk '{print $1}')

echo "✅ Dispositivo detectado: $DEVICE_NAME (ID: $DEVICE_ID)"

# Verificar versión de iOS
echo "📋 Verificando compatibilidad de iOS..."
IOS_VERSION=$(xcrun xctrace list devices | grep "iPhone" | grep -o "([0-9]*\.[0-9]*\.[0-9]*)" | tr -d "()")
echo "   Versión de iOS: $IOS_VERSION"

cd ios

echo "🔐 Verificando configuración de firma..."

# Verificar identidad de desarrollo disponible
DEV_IDENTITY=$(security find-identity -v -p codesigning | grep "Apple Development" | head -1)

if [ -n "$DEV_IDENTITY" ]; then
    echo "   ✅ Identidad de desarrollo encontrada"
    echo "   $DEV_IDENTITY"
else
    echo "   ❌ No se encontró identidad de desarrollo"
    echo "   Abre Xcode > Preferences > Accounts y agrega tu Apple ID"
    exit 1
fi

# Construir e instalar usando xcodebuild (usar workspace, no proyecto)
# El Team ID se toma del proyecto, configurado en Xcode
echo "🚀 Instalando app en dispositivo..."
xcodebuild \
    -workspace priorityBox.xcworkspace \
    -scheme priorityBox \
    -destination "id=$DEVICE_ID" \
    -allowProvisioningUpdates \
    -allowProvisioningDeviceRegistration \
    CODE_SIGN_STYLE=Automatic \
    ENABLE_USER_SCRIPT_SANDBOXING=NO \
    install

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "📌 Próximos pasos en tu iPhone:"
echo "   1. Ve a Configuración > General > Gestión de dispositivos"
echo "   2. Busca tu Apple ID y toca 'Confiar'"
echo "   3. Confirma que confías en las apps"
echo "   4. Abre PriorityBox desde tu pantalla de inicio"
echo ""
echo "⚠️  Recordatorio:"
echo "   - Esta instalación durará 7 días con cuenta gratuita"
echo "   - Después de 7 días, reinstala ejecutando: npm run install:ios:device"
echo ""