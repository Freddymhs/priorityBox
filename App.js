import React from "react";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppArea from "./AppArea";
import { nativeBaseTheme } from "./lib/nativebase-theme";

// Ignorar warnings específicos de NativeBase deprecado
LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary",
  "SafeAreaView has been deprecated",
  "is not a valid color or brush",
  "VirtualizedLists should never be nested",
]);

export default function App() {
  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <AppArea />
    </NativeBaseProvider>
  );
}
