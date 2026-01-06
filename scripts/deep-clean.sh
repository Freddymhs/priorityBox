#!/bin/bash

echo '🧹 Limpieza profunda del proyecto...'
echo ''

# Detener procesos
echo '⏹  Deteniendo Metro y puertos...'
npx kill-port 8080 8081 2>/dev/null || true

# Directorios del proyecto
echo '📁 Eliminando directorios de build...'
rm -rf android
rm -rf ios
rm -rf .expo
rm -rf node_modules

# Cache de herramientas
echo '🗑  Limpiando cache de herramientas...'
rm -rf node_modules/.cache
rm -rf .metro
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-map-* 2>/dev/null || true
rm -rf /tmp/react-* 2>/dev/null || true

# Cache de Xcode
echo '🍎 Limpiando cache de Xcode...'
rm -rf ~/Library/Developer/Xcode/DerivedData/priorityBox-* 2>/dev/null || true

# Cache de Expo
echo '📦 Limpiando cache de Expo...'
rm -rf ~/.expo/ios-simulator-app-cache 2>/dev/null || true

# Lockfiles (se regenerarán)
echo '🔒 Eliminando lockfiles...'
rm -f package-lock.json
rm -f yarn.lock

# Logs
echo '📋 Eliminando logs...'
rm -f *.log
rm -f ios-install.log

echo ''
echo '✅ Limpieza completa finalizada'
echo ''
echo '📝 Próximos pasos:'
echo '   1. yarn                    # Reinstalar dependencias'
echo '   2. npm run setup:ios       # Recrear proyecto iOS'
echo '   3. Configurar signing en Xcode'
echo '   4. npm run ios:device      # Compilar e instalar'
echo ''
