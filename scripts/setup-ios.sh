#!/bin/bash

echo '🔧 Generando proyecto iOS...'
npx expo prebuild --platform ios

if [ $? -ne 0 ]; then
    echo "❌ Error en prebuild"
    exit 1
fi

echo '📦 Instalando CocoaPods...'
cd ios && pod install

if [ $? -ne 0 ]; then
    echo "❌ Error en pod install"
    exit 1
fi

echo ''
echo '✅ Proyecto generado exitosamente'
echo ''
echo '📋 Próximo paso:'
echo '   1. Abre Xcode: open ios/priorityBox.xcworkspace'
echo '   2. Configura Signing & Capabilities con tu Apple ID'
echo '   3. Ejecuta: npm run ios:device'
echo ''
