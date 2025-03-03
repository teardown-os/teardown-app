import { createStaticNavigation, type StaticParamList } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HomeScreen } from "../screens/home.screen";
import { WelcomeScreen } from "../screens/welcome.screen";
import { AuthScreen } from "../screens/auth.screen";
import { View } from "@/components/ui/view";
import { colors } from "@/theme/colors";

const RootStack = createStackNavigator({
  screens: {
    Welcome: WelcomeScreen,
    Auth: {
      screen: AuthScreen,
      options: {

      }
    },
    Home: HomeScreen,
  },
  screenOptions() {
    return {
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.dark.background,

      },
    };
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export const Navigation = () => {
  return (
    <View className="flex-1 bg-background">
      <StaticNavigation />
    </View>
  );
};
