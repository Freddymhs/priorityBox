#!/usr/bin/env bash
set -euo pipefail

# Simple helper to convert a .aab to universal APKs and install on a target device.
# Usage: ./scripts/install-aab-to-device.sh [AAB_PATH] [DEVICE_ID]

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

AAB_PATH=${1:-build-latest.aab}
DEVICE_ID=${2:-192.168.5.80:43407}
BUNDLETOOL_JAR=${BUNDLETOOL_JAR:-bundletool.jar}
OUTPUT_APKS=${OUTPUT_APKS:-prioritybox.apks}

if [[ ! -f "$AAB_PATH" ]]; then
  echo "❌ No se encontró el AAB en '$AAB_PATH'. Pasa la ruta como primer argumento." >&2
  exit 1
fi

if [[ ! -f "$BUNDLETOOL_JAR" ]]; then
  echo "⬇️  Descargando bundletool..."
  curl -L "https://github.com/google/bundletool/releases/download/1.17.1/bundletool-all-1.17.1.jar" -o "$BUNDLETOOL_JAR"
fi

if [[ -f "$OUTPUT_APKS" ]]; then
  echo "ℹ️  Eliminando build anterior: $OUTPUT_APKS"
  rm -f "$OUTPUT_APKS"
fi

echo "📦 Generando APK universal desde $AAB_PATH..."
java -jar "$BUNDLETOOL_JAR" build-apks \
  --bundle="$AAB_PATH" \
  --output="$OUTPUT_APKS" \
  --mode=universal \
  --ks="$HOME/.android/debug.keystore" \
  --ks-pass=pass:android \
  --ks-key-alias=androiddebugkey \
  --key-pass=pass:android

echo "📲 Instalando en dispositivo $DEVICE_ID..."
java -jar "$BUNDLETOOL_JAR" install-apks \
  --apks="$OUTPUT_APKS" \
  --device-id="$DEVICE_ID"

echo "✅ Instalación finalizada."
