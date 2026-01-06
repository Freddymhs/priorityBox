#!/bin/bash

echo '📱 Instalando app en modo DEBUG en iPhone...'
echo '   Esto te permitirá ver errores en pantalla'
echo ''

# Verificar que exista el directorio iOS
if [ ! -d ios ]; then
    echo '❌ Error: No existe el directorio ios/'
    exit 1
fi

# Matar metro si está corriendo
echo '🔄 Deteniendo Metro Bundler...'
npx kill-port 8080 8081 2>/dev/null

# Iniciar Metro en background
echo '📦 Iniciando Metro Bundler...'
npx expo start --clear &
METRO_PID=$!

# Esperar a que Metro esté listo
sleep 5

# Compilar e instalar en modo Debug
echo ''
echo '🔨 Compilando e instalando en iPhone (modo Debug)...'
npx expo run:ios --device --configuration Debug

echo ''
echo '✅ Instalación completada'
echo ''
echo '⚠️  IMPORTANTE:'
echo '   - La app ahora mostrará errores en pantalla roja'
echo '   - Mantén Metro Bundler corriendo (no cierres esta terminal)'
echo '   - Para detener Metro: kill '$METRO_PID
