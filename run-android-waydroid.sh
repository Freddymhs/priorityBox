#!/bin/bash

echo "🚀 Iniciando PriorityBox en Android..."

# Detectar dispositivos conectados
DEVICES=$(adb devices | grep -v "List" | grep "device$" | awk '{print $1}')
DEVICE_COUNT=$(echo "$DEVICES" | grep -c .)

if [ "$DEVICE_COUNT" -eq 0 ]; then
  echo "❌ No hay dispositivos Android conectados"
  exit 1
fi

# Si hay múltiples dispositivos, mostrar lista y seleccionar
if [ "$DEVICE_COUNT" -gt 1 ]; then
  echo "📱 Múltiples dispositivos detectados:"
  echo ""
  i=1
  for device in $DEVICES; do
    MODEL=$(adb -s "$device" shell getprop ro.product.model 2>/dev/null | tr -d '\r')
    echo "  [$i] $device ($MODEL)"
    i=$((i + 1))
  done
  echo ""
  read -p "Selecciona dispositivo [1-$DEVICE_COUNT] (default: 1): " SELECTION

  if [ -z "$SELECTION" ]; then
    SELECTION=1
  fi

  DEVICE=$(echo "$DEVICES" | sed -n "${SELECTION}p")
else
  DEVICE=$DEVICES
fi

echo "📱 Usando dispositivo: $DEVICE"

# Limpieza completa de procesos Metro zombies
pkill -f "expo start" || true
pkill -f "metro" || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
sleep 1

# Detectar IP local (crítico para forzar IPv4)
LOCAL_IP=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v 127.0.0.1 | head -1)
echo "🌐 IP: ${LOCAL_IP}"

# Reiniciar Expo Go en el dispositivo seleccionado
adb -s "$DEVICE" shell am force-stop host.exp.exponent || true
adb -s "$DEVICE" shell am start -n host.exp.exponent/.experience.HomeActivity
sleep 2

# Iniciar Metro en IPv4 con caché limpio
echo "⚙️  Metro iniciando en IPv4:8080..."
EXPO_PACKAGER_HOSTNAME=${LOCAL_IP} npx expo start --clear --port 8080 &
METRO_PID=$!

# Espera para que Metro esté listo (--clear requiere más tiempo)
sleep 10

# Conectar dispositivo automáticamente
adb -s "$DEVICE" shell am start -a android.intent.action.VIEW -d "exp://${LOCAL_IP}:8080" >/dev/null 2>&1

echo "✅ Listo! URL: exp://${LOCAL_IP}:8080"
echo "🛑 Detener: Ctrl+C"

# Mantener proceso vivo y mostrar logs
wait $METRO_PID
