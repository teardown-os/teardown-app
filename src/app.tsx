import 'react-native-url-polyfill/auto';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { colorScheme } from "nativewind";
import type React from "react";
import type { FunctionComponent } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Navigation } from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContainer } from "./_sdk/modules/auth";
import { BottomSheetRoot } from "./components/ui/bottom-sheet";

import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { teardown } from "@/_sdk";

colorScheme.set("dark");

export const App: FunctionComponent = () => {
  // Wrap the Navigation component with all providers
  return (
    <QueryClientProvider client={teardown.queries.client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <BottomSheetRoot>
              <AuthContainer>
                <Navigation />
              </AuthContainer>
            </BottomSheetRoot>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};
