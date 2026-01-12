#!/usr/bin/env node
/**
 * Patch native-base 3.4.28 for React Native 0.81.5+ BackHandler API compatibility
 * This fixes: TypeError: _reactNative.BackHandler.removeEventListener is not a function
 */

const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'node_modules/native-base/src/hooks/useKeyboardDismissable.ts',
  'node_modules/native-base/lib/module/hooks/useKeyboardDismissable.js',
  'node_modules/native-base/lib/commonjs/hooks/useKeyboardDismissable.js'
];

filesToPatch.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // If file doesn't have removeEventListener, skip it
  if (!content.includes('removeEventListener')) {
    return;
  }

  // Replace all instances of BackHandler.removeEventListener with subscription.remove()
  // First, replace the simple case: BackHandler.removeEventListener(...)
  const simpleRemovePattern = /BackHandler\.removeEventListener\(['"]hardwareBackPress['"],\s*(\w+)\)/g;
  if (simpleRemovePattern.test(content)) {
    content = content.replace(simpleRemovePattern, (match, callbackName) => {
      return `subscription?.remove()`;
    });
    modified = true;
  }

  // Pattern for _reactNative.BackHandler.removeEventListener (commonjs)
  const commonjsRemovePattern = /_reactNative\.BackHandler\.removeEventListener\(['"]hardwareBackPress['"],\s*(\w+)\)/g;
  if (commonjsRemovePattern.test(content)) {
    content = content.replace(commonjsRemovePattern, (match, callbackName) => {
      return `subscription?.remove()`;
    });
    modified = true;
  }

  // Now inject subscription variable if it doesn't exist
  // Look for addEventListener and ensure we store the subscription
  const addEventPattern = /(\s+)(const|let)?\s*(\w+\s*=\s*)?BackHandler\.addEventListener\(['"]hardwareBackPress['"],\s*(\w+)\)/;
  const addEventPatternCommonjs = /(\s+)(const|let)?\s*(\w+\s*=\s*)?_reactNative\.BackHandler\.addEventListener\(['"]hardwareBackPress['"],\s*(\w+)\)/;

  if (addEventPattern.test(content) || addEventPatternCommonjs.test(content)) {
    // Ensure subscription variable is declared
    if (!content.includes('let subscription')) {
      // Find the useEffect opening and add subscription declaration
      const useEffectPattern = /useEffect\(\(\)\s*=>\s*\{/;
      content = content.replace(useEffectPattern, (match) => {
        return match + '\n    let subscription = null;';
      });
    }

    // Replace addEventListener to store result
    content = content.replace(/BackHandler\.addEventListener\(/g, 'subscription = BackHandler.addEventListener(');
    content = content.replace(/_reactNative\.BackHandler\.addEventListener\(/g, 'subscription = _reactNative.BackHandler.addEventListener(');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Patched ${file}`);
  }
});
