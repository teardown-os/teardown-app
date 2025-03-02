
import { colorScheme } from "nativewind";
import type React from 'react';
import type { FunctionComponent } from 'react';
import { Navigation } from './navigation';

import "./global.css";

colorScheme.set("dark");

export const App: FunctionComponent = () => {
  return (
    <Navigation />
  );
}

