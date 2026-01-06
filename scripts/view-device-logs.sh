#!/bin/bash

echo '📱 Monitoreando logs de tu iPhone...'
echo '   Abre la app en tu iPhone para ver los logs'
echo '   Presiona Ctrl+C para salir'
echo ''

# Detectar dispositivo
DEVICE=$(xcrun devicectl list devices 2>/dev/null | grep iPhone | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo "❌ No se detectó iPhone conectado"
    exit 1
fi

echo "Dispositivo: $DEVICE"
echo "Filtrando logs de priorityBox..."
echo ''

# Ver logs del dispositivo
xcrun devicectl device info logs --device "$DEVICE" --style stream 2>&1 | grep -i --line-buffered "priorityBox\|error\|exception\|fatal"
