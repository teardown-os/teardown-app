import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { HomeScreen } from '../screens/home.screen';
import { WelcomeScreen } from '../screens/welcome.screen';
import { View } from '@/components/ui/view';
import { colors } from '@/theme/colors';

const RootStack = createNativeStackNavigator({
  
  screens: {
    Welcome: WelcomeScreen,
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

export const Navigation = () => {
  return (
    <View className="flex-1 bg-background">
      <StaticNavigation />
    </View>
  );
}
