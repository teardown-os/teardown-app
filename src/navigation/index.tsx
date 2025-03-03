import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as React from "react";
import { HomeScreen } from "../screens/home.screen";
import { WelcomeScreen } from "../screens/welcome.screen";
import { AuthScreen } from "../screens/auth.screen";
import { View } from "@/components/ui/view";
import { colors } from "@/theme/colors";
import { useAuth } from "@/_sdk/modules/auth";

const useIsUserSignedIn = () => {
  const session = useAuth();
  return session != null;
};

const useIsUserSignedOut = () => {
  const session = useAuth();
  return session == null;
};


const RootStack = createStackNavigator({
  screens: {

  },
  groups: {
    Auth: {
      if: useIsUserSignedOut,
      screens: {
        Welcome: WelcomeScreen,
        Auth: AuthScreen,
      },
    },
    App: {
      if: useIsUserSignedIn,
      screens: {
        Home: HomeScreen,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    contentStyle: {
      backgroundColor: colors.dark.background,
    },
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
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
  return <StaticNavigation />;
};
