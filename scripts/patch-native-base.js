#!/usr/bin/env node
/**
 * Patches for native-base 3.4.28 on React Native 0.81.5+ (New Architecture / Fabric).
 *
 * 1) BackHandler API: replace removeEventListener with subscription.remove()
 * 2) outlineWidth as String crashes RCTView under Fabric — coerce '0' to 0.
 */

const fs = require('fs');
const path = require('path');

function walkDir(dir, ext, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, ext, acc);
    else if (ext.some((e) => entry.name.endsWith(e))) acc.push(full);
  }
  return acc;
}

function patchOutlineWidth() {
  // Cubre todo el árbol de theme (decenas de ocurrencias en input.js, button.js, etc.)
  // y utils/resolveStackStyleInput. Strings tipo '0', '2px', '4px' rompen RCTView en Fabric.
  const roots = [
    'node_modules/native-base/src/theme',
    'node_modules/native-base/lib/module/theme',
    'node_modules/native-base/lib/commonjs/theme',
    'node_modules/native-base/src/utils',
    'node_modules/native-base/lib/module/utils',
    'node_modules/native-base/lib/commonjs/utils',
  ];

  const files = roots.flatMap((r) =>
    walkDir(path.join(__dirname, '..', r), ['.js', '.ts'])
  );

  let totalPatched = 0;
  files.forEach((filePath) => {
    const original = fs.readFileSync(filePath, 'utf8');
    const patched = original
      .replace(/outlineWidth:\s*['"](\d+)(?:px)?['"]/g, 'outlineWidth: $1')
      .replace(/outline:\s*['"]none['"],?\s*\n?/g, '');

    if (patched !== original) {
      fs.writeFileSync(filePath, patched);
      totalPatched++;
    }
  });

  if (totalPatched > 0) {
    console.log(`✓ Patched outlineWidth/outline in ${totalPatched} native-base file(s)`);
  }
}

patchOutlineWidth();

const filesToPatch = [
  'node_modules/native-base/src/hooks/useKeyboardDismissable.ts',
  'node_modules/native-base/lib/module/hooks/useKeyboardDismissable.js',
  'node_modules/native-base/lib/commonjs/hooks/useKeyboardDismissable.js'
];

filesToPatch.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⊘ File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if already properly patched
  if (content.includes('subscription = BackHandler.addEventListener') ||
      content.includes('subscription = _reactNative.BackHandler.addEventListener')) {
    return; // Already patched
  }

  // STEP 1: Ensure subscription variable exists in useBackHandler
  if (!content.includes('let subscription = null;')) {
    // Find useBackHandler function and add subscription variable after useEffect opening
    content = content.replace(
      /export function useBackHandler\(\{[\s\S]*?\}\) \{\s*useEffect\(\(\) => \{/,
      (match) => match + '\n    let subscription = null;'
    );
    content = content.replace(
      /function useBackHandler\(\{[\s\S]*?\}\) \{\s*\(0, _react\.useEffect\)\(\(\) => \{/,
      (match) => match + '\n    let subscription = null;'
    );
    modified = true;
  }

  // STEP 2: Replace BackHandler.addEventListener(...) with subscription = BackHandler.addEventListener(...)
  const addEventListenerPattern = /BackHandler\.addEventListener\(['"]hardwareBackPress['"]\s*,\s*(\w+)\)/g;
  if (addEventListenerPattern.test(content)) {
    content = content.replace(addEventListenerPattern, 'subscription = BackHandler.addEventListener(\'hardwareBackPress\', $1)');
    modified = true;
  }

  // STEP 3: Replace _reactNative.BackHandler.addEventListener with subscription = _reactNative.BackHandler.addEventListener
  const addEventListenerCommonjsPattern = /_reactNative\.BackHandler\.addEventListener\(['"]hardwareBackPress['"]\s*,\s*(\w+)\)/g;
  if (addEventListenerCommonjsPattern.test(content)) {
    content = content.replace(addEventListenerCommonjsPattern, 'subscription = _reactNative.BackHandler.addEventListener(\'hardwareBackPress\', $1)');
    modified = true;
  }

  // STEP 4: Replace BackHandler.removeEventListener with subscription?.remove()
  const removeEventListenerPattern = /BackHandler\.removeEventListener\(['"]hardwareBackPress['"]\s*,\s*(\w+)\)/g;
  if (removeEventListenerPattern.test(content)) {
    content = content.replace(removeEventListenerPattern, 'subscription?.remove()');
    modified = true;
  }

  // STEP 5: Replace _reactNative.BackHandler.removeEventListener with subscription?.remove()
  const removeEventListenerCommonjsPattern = /_reactNative\.BackHandler\.removeEventListener\(['"]hardwareBackPress['"]\s*,\s*(\w+)\)/g;
  if (removeEventListenerCommonjsPattern.test(content)) {
    content = content.replace(removeEventListenerCommonjsPattern, 'subscription?.remove()');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Patched ${file}`);
  }
});
