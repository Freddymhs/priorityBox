#!/bin/bash

# Verificar que exista el directorio iOS
if [ ! -d ios ]; then
    echo '❌ Error: No existe el directorio ios/'
    echo '   Ejecuta primero: npm run setup:ios'
    exit 1
fi

echo '📱 Compilando app para iPhone...'

# Compilar usando el script de instalación
./scripts/install-ios-device.sh | tee ios-install.log

if [ $? -ne 0 ]; then
    echo "❌ Error en la compilación"
    echo "   Revisa el log en: ios-install.log"
    exit 1
fi

echo ''
echo '📲 Instalando en iPhone...'

# Detectar dispositivo
DEVICE=$(xcrun devicectl list devices 2>/dev/null | grep iPhone | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo "❌ No se detectó iPhone conectado"
    echo "   Conecta tu iPhone por USB o WiFi"
    exit 1
fi

echo "   Dispositivo detectado: $DEVICE"

# Buscar la app compilada
APP_PATH=$(find ~/Library/Developer/Xcode/DerivedData/priorityBox-*/Build/Intermediates.noindex/ArchiveIntermediates/priorityBox/InstallationBuildProductsLocation/Applications -name 'priorityBox.app' 2>/dev/null | head -1)

if [ -z "$APP_PATH" ]; then
    echo "❌ No se encontró la app compilada"
    echo "   Intenta compilar de nuevo"
    exit 1
fi

# Instalar en el dispositivo
xcrun devicectl device install app --device "$DEVICE" "$APP_PATH"

if [ $? -eq 0 ]; then
    echo ''
    echo '✅ App instalada exitosamente en iPhone'
    echo ''
    echo '📋 Próximos pasos:'
    echo '   1. En tu iPhone: Ajustes > General > Gestión de dispositivos'
    echo '   2. Toca tu Apple ID y selecciona "Confiar"'
    echo '   3. Abre PriorityBox desde tu pantalla de inicio'
    echo ''
    echo '⚠️  Nota: La app expira en 7 días (cuenta gratuita)'
else
    echo ''
    echo '❌ Error al instalar la app'
    echo '   Revisa que tu iPhone esté desbloqueado y conectado'
    exit 1
fi
