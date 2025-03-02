import * as React from "react";
import { ActivityIndicator, View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("items-center justify-center", {
  variants: {
    variant: {
      default: "text-primary",
      dark: "text-white",
      splice: "text-primary",
    },
    size: {
      default: "h-6 w-6",
      sm: "h-4.5 w-4.5",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xs: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface SpinnerProps
  extends ViewProps,
    VariantProps<typeof spinnerVariants> {}

export const Spinner = React.forwardRef<React.ElementRef<typeof View>, SpinnerProps>(
  ({ className, variant, size, ...props }, ref) => {
    const colorMap = {
      default: "#0891b2", // cyan-600
      dark: "#ffffff",
      splice: "#0891b2", // cyan-600
    };

    const sizeMap: Record<string, "small" | "large"> = {
      default: "small",
      sm: "small",
      md: "small",
      lg: "large",
      xs: "small",
    };

    return (
      <View
        ref={ref}
        className={cn(spinnerVariants({ variant, size, className }))}
        {...props}
      >
        <ActivityIndicator 
          color={colorMap[variant || "default"]} 
          size={sizeMap[size as string || "default"]} 
        />
      </View>
    );
  }
);

Spinner.displayName = "Spinner"; 