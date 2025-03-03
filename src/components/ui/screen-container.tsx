import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import React from "react";
import { KeyboardGestureArea, KeyboardStickyView } from "react-native-keyboard-controller";
import type { Edge } from "react-native-safe-area-context";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, type ViewProps } from "./view";

// Base Screen component props
export interface ScreenProps extends ViewProps {
}

// Content component props
export interface ScreenContentProps extends ViewProps {
  children: ReactNode;
  /**
   * Array of edges to apply safe area insets to
   * Default: ['top']
   * Possible values: 'top', 'right', 'bottom', 'left'
   */
  insets?: Edge[];
}

// Header component props
export interface ScreenHeaderProps extends ViewProps {
  children: ReactNode;
}

// Footer component props
export interface ScreenFooterProps extends ViewProps {
  sticky?: boolean;
}

// Main Screen component
const ScreenRoot = ({
  children,
  className,
  style,
}: ScreenProps) => {
  return (
    <View
      className={cn(
        "flex-1 bg-background",
        className
      )}
      style={style}
    >
      {children}
    </View>
  );
};

// Screen Content component with SafeAreaView
const ScreenContent = ({
  children,
  className,
  insets = ["top"],
  ...props
}: ScreenContentProps) => {
  return (
    <KeyboardGestureArea interpolator="ios" style={{ flex: 1 }}>
      <SafeAreaView
        edges={insets}
        {...props}
        className={cn("flex-1", className)}
      >
        {children}
      </SafeAreaView>
    </KeyboardGestureArea>
  );
};

// Screen Header component
const ScreenHeader = ({
  children,
  className,
  ...props
}: ScreenHeaderProps) => {
  return (
    <View
      {...props}
      className={cn("w-full", className)}
    >
      {children}
    </View>
  );
};

// Screen Footer component
const ScreenFooter = ({
  children,
  sticky = false,
  ...props
}: ScreenFooterProps) => {
  const { bottom } = useSafeAreaInsets();

  const Component = sticky ? KeyboardStickyView : View;

  return (
    <Component
      {...props}
      offset={{
        closed: -bottom,
        opened: 0,
      }}
      className={cn("w-full",
        `bg-background p-4`,
        !sticky && "",
        props.className)}
    >
      <View style={{ paddingBottom: !sticky ? bottom : 0 }}>
        {children}
      </View>
    </Component>
  );
};


export {
  ScreenContent, ScreenFooter, ScreenHeader, ScreenRoot
};

