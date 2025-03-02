

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { HomeScreen } from './screens/home.screen';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

export const Navigation = () => {
  return (
    <StaticNavigation />
  );
}
