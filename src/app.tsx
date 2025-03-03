import 'react-native-gesture-handler';
import { colorScheme } from "nativewind";
import type React from "react";
import type { FunctionComponent } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Navigation } from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "./global.css";

colorScheme.set("dark");


export const App: FunctionComponent = () => {
  // Wrap the Navigation component with all providers
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Navigation />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
};
