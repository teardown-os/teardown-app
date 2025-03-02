import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import React, { type FunctionComponent } from "react";
import { TeardownLogo } from "@/assets/logos/teardown.logo";
import { Button } from "@/components/ui/button";
import { Home } from "@/assets/icons";

export type WelcomeScreenProps = Record<string, never>;

export const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = () => {
  return (
    <View className="flex flex-1 bg-background">
      {/* Top gradient area */}
      <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="flex flex-col items-center justify-center gap-6 px-6">
          {/* Logo with animation effect */}
          <View className="mb-2">
            <TeardownLogo className="w-28 h-28" />
          </View>
          
          {/* Main heading with better typography */}
          <Text className="text-3xl font-bold text-center text-primary">
            Welcome to Teardown
          </Text>
          
          {/* Subheading with description */}
          <Text className="text-base text-center text-muted-foreground mb-4 max-w-xs">
            Your all-in-one tools for managing your mobile releases, from your mobile.
          </Text>
          
        </View>
      </View>
      <View className="p-4 absolute bottom-0 w-full">
  
  <Button className="">
    Get Started
  </Button>
</View>
      </View>
 


      {/* Footer area */}
      <View className="pb-8 pt-4">
        <Text className="text-xs text-center text-muted-foreground">
          Version 0.0.1 • © 2025 Teardown
        </Text>
      </View>
    </View>
  );
}; 