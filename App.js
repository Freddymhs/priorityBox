import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppArea from "./AppArea";
console.disableYellowBox = true;

export default function App() {
  return (
    // native base , container and provider
    <NativeBaseProvider>
      {/* main content of this app */}
      <AppArea />
    </NativeBaseProvider>
  );
}
