import * as React from "react";
import { View } from "./view";
import { Text } from "./text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ViewStyle, TextStyle } from "react-native";

const chipVariants = cva(
  "flex flex-row items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary/10",
        secondary: "bg-secondary/10",
        success: "bg-success/10",
        warning: "bg-warning/10",
        danger: "bg-destructive/10",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        sm: "px-3 py-1 rounded-full",
        md: "px-4 py-2 rounded-full",
        lg: "px-4 py-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const chipTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-destructive",
      outline: "text-foreground",
      ghost: "text-foreground",
    },
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ChipProps extends VariantProps<typeof chipVariants> {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface ChipTextProps extends VariantProps<typeof chipTextVariants> {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

const ChipContext = React.createContext<VariantProps<typeof chipTextVariants>>({
  variant: "default",
  size: "md",
});

export const ChipText: React.FC<ChipTextProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  const context = React.useContext(ChipContext);

  return (
    <Text
      className={cn(chipTextVariants({ ...context, ...props }), className)}
      style={style}
    >
      {children}
    </Text>
  );
};

ChipText.displayName = "ChipText";

export const Chip: React.FC<ChipProps> = ({
  className,
  variant,
  size,
  children,
  startIcon,
  endIcon,
  style,
  ...props
}) => {
  const isChildrenString = typeof children === "string";

  return (
    <ChipContext.Provider value={{ variant, size }}>
      <View
        className={cn(chipVariants({ variant, size, className }))}
        style={style}
      >
        {startIcon && (
          <View className="mr-1.5">{startIcon}</View>
        )}
        {isChildrenString ? (
          <ChipText>{children}</ChipText>
        ) : (
          children
        )}
        {endIcon && (
          <View className="ml-1.5">{endIcon}</View>
        )}
      </View>
    </ChipContext.Provider>
  );
};

Chip.displayName = "Chip";

export { chipVariants, chipTextVariants }; 