import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { InteractionManager, TextInput } from "react-native";
import type { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "w-full border shadow-m rounded-xl text-foreground",
  {
    variants: {
      variant: {
        default: "bg-input border-input",
        outline: "bg-background border-input",
        destructive: "bg-destructive/10 border-destructive",
        secondary: "bg-secondary border-secondary",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "h-10 px-3 py-2 text-sm",
        md: "h-14 px-6 py-3",
        lg: "h-20 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps extends Omit<TextInputProps, "onChange">, VariantProps<typeof inputVariants> {
  className?: string;
  onChange?: (text: string) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, variant, size, placeholderTextColor = "#6b7280", onChange, onChangeText, ...props }, ref) => {

    const [isFocused, setIsFocused] = useState(false);

    const onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    }, [props.onFocus])

    const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    }, [props.onBlur])

    const handleOnChangeText = useCallback((text: string) => {
      onChange?.(text);
      onChangeText?.(text);
    }, [onChange, onChangeText])

    return (
      <TextInput
        ref={ref}
        className={cn(
          inputVariants({ variant, size, className }),
          {
            "border-white shadow-sm": isFocused
          }
        )}
        placeholderTextColor={placeholderTextColor}
        {...props}
        onChangeText={handleOnChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

Input.displayName = "Input";

export { inputVariants }; 