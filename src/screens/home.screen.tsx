import { Home } from "@/assets/icons";
import { View } from "@/components/ui/view";

import React, { type FunctionComponent } from "react";

export type HomeScreenProps = Record<string, never>;

export const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  return (
    <View className="flex flex-1 items-center justify-center gap-8">
      <Home  className="w-10 h-10 text-red-500"/>
    </View>
  );
};  