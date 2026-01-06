#!/bin/bash

echo '📱 Iniciando Metro Bundler para iPhone físico...'
echo ''

# Matar metro si está corriendo
npx kill-port 8080 8081 2>/dev/null

echo '📦 Metro Bundler se iniciará y mostrará logs en tiempo real'
echo '   Abre PriorityBox en tu iPhone para ver los errores'
echo '   Presiona Ctrl+C para detener'
echo ''

# Iniciar metro con logs detallados
npx expo start --clear --dev-client
