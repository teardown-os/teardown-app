import * as React from "react";
import { 
  Pressable, 
  type PressableProps, 
  type TextProps,
  type LayoutChangeEvent
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import { Text, TextClassContext } from "./text";
import { View } from "./view";
import type { FunctionComponent } from "react";

const buttonVariants = cva(
  "flex flex-row items-center justify-center gap-2 rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm active:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm  active:bg-destructive/90",
        outline: "border border-input bg-background shadow-xs active:bg-accent active:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs active:bg-secondary/80",
        ghost: "active:bg-accent active:text-accent-foreground",
        link: "text-primary underline-offset-4 active:underline",
      },
      size: {
        sm: "h-10 px-3",
        md: "h-16 px-6 ",
        lg: "h-20 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const buttonTextVariants = cva("text-sm font-medium text-center", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      icon: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ButtonTextProps
  extends TextProps,
    VariantProps<typeof buttonTextVariants> {}

const StartAdornment = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <View className="absolute h-full pl-4 justify-center items-center content-center left-0">
      {children}
    </View>
  );
});

const EndAdornment = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <View className="absolute h-full pr-4 justify-center items-center content-center right-0">
      {children}
    </View>
  );
});

// Updated ButtonText to use the TextClassContext
export const ButtonText: FunctionComponent<ButtonTextProps> = 
  ({ className, variant, size, style, children, ...props }) => {
    const contextClassName = React.useContext(TextClassContext);
    
    return (
      <Text
        className={cn(
          contextClassName || buttonTextVariants({ variant, size }),
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </Text>
    );
  };

ButtonText.displayName = "ButtonText";

const Button = React.forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading = false,
      start,
      end,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const isChildrenString = typeof children === "string";
    const minWidthRef = React.useRef(0);
    const textClassName = buttonTextVariants({ variant, size });

    const onLayout = React.useCallback(
      (event: LayoutChangeEvent) => {
        if (isLoading) {
          return;
        }
        minWidthRef.current = event.nativeEvent.layout.width;
      },
      [isLoading]
    );

    const renderContent = () => {
      if (isLoading) {
        return (
          <View className="items-center justify-center">
            <Spinner 
              variant={variant === "default" || variant === "destructive" ? "dark" : "default"} 
              size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
            />
          </View>
        );
      }

      return (
        <React.Fragment>
          {start && (
            <StartAdornment>{start}</StartAdornment>
          )}
          {isChildrenString ? (
            <ButtonText>
              {children as string}
            </ButtonText>
          ) : (
            children
          )}
          {end && (
            <EndAdornment>{end}</EndAdornment>
          )}
        </React.Fragment>
      );
    };

    return (
      <TextClassContext.Provider value={textClassName}>
        <Pressable
          ref={ref}
          disabled={disabled || isLoading}
          className={cn(
            buttonVariants({ variant, size, className }),
            isLoading && `min-w-[${minWidthRef.current}px]`,
            disabled && "opacity-60",
          )}
          style={style}
          onLayout={onLayout}
          {...props}
        >
          {renderContent()}
        </Pressable>
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants }; 