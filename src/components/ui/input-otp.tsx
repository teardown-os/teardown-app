import * as React from "react";
import { View, TextInput, type NativeSyntheticEvent, type TextInputKeyPressEventData } from "react-native";
import { cn } from "@/lib/utils";
import Animated, { FadeIn } from "react-native-reanimated";

interface OTPContextValue {
  value: string;
  activeIndex: number;
  maxLength: number;
  setValue: (value: string) => void;
  setActiveIndex: (index: number) => void;
  focusInput: (index: number) => void;
  registerInput: (index: number, ref: TextInput | null) => void;
}

const OTPContext = React.createContext<OTPContextValue>({
  value: "",
  activeIndex: 0,
  maxLength: 6,
  setValue: () => { },
  setActiveIndex: () => { },
  focusInput: () => { },
  registerInput: () => { },
});

interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export const InputOTP = React.forwardRef<View, InputOTPProps>((props, ref) => {
  const {
    value: controlledValue,
    onChange,
    onComplete,
    maxLength = 6,
    className,
    containerClassName,
    children,
  } = props;

  const [internalValue, setInternalValue] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  const value = controlledValue ?? internalValue;

  const setValue = React.useCallback((newValue: string) => {
    const sanitizedValue = newValue.slice(0, maxLength);
    setInternalValue(sanitizedValue);
    onChange?.(sanitizedValue);

    if (sanitizedValue.length === maxLength) {
      onComplete?.(sanitizedValue);
    }
  }, [maxLength, onChange, onComplete]);

  const focusInput = React.useCallback((index: number) => {
    if (index >= 0 && index < maxLength) {
      inputRefs.current[index]?.focus();
    }
  }, [maxLength]);

  const registerInput = React.useCallback((index: number, ref: TextInput | null) => {
    inputRefs.current[index] = ref;
  }, []);

  const contextValue = React.useMemo(() => ({
    value,
    activeIndex,
    maxLength,
    setValue,
    setActiveIndex,
    focusInput,
    registerInput,
  }), [value, activeIndex, maxLength, setValue, focusInput, registerInput]);

  return (
    <OTPContext.Provider value={contextValue}>
      <View ref={ref} className={cn("flex flex-row items-center", containerClassName)}>
        {children}
      </View>
    </OTPContext.Provider>
  );
});

InputOTP.displayName = "InputOTP";

export const InputOTPGroup = React.forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} />
  )
);

InputOTPGroup.displayName = "InputOTPGroup";

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<typeof View> {
  index: number;
}

export const InputOTPSlot = React.forwardRef<View, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, activeIndex, maxLength, setValue, setActiveIndex, focusInput, registerInput } = React.useContext(OTPContext);
    const inputRef = React.useRef<TextInput>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        registerInput(index, inputRef.current);
      }
    }, [index, registerInput]);

    React.useEffect(() => {
      if (index === 0) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [index]);

    const handleChangeText = (text: string) => {
      if (text.length <= 1) {
        const newValue = value.split("");
        newValue[index] = text;
        setValue(newValue.join(""));

        if (text.length === 1 && index < maxLength - 1) {
          focusInput(index + 1);
        }
      }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
        focusInput(index - 1);
      }
    };

    const handleFocus = () => {
      setActiveIndex(index);
    };

    return (
      <View
        ref={ref}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center border border-input rounded-xl bg-input shadow-xs",
          activeIndex === index && "z-10 border-white shadow-sm",
          className
        )}
        {...props}
      >
        <TextInput
          ref={inputRef}
          className="text-center text-lg font-medium text-foreground w-full h-full"
          maxLength={1}
          keyboardType="number-pad"
          value={value[index] || ""}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
        />
        {/* {activeIndex === index && !value[index] && (
          <Animated.View
            entering={FadeIn}
            className="absolute h-6 w-0.5 bg-foreground"
          />
        )} */}
      </View>
    );
  }
);

InputOTPSlot.displayName = "InputOTPSlot";

export const InputOTPSeparator = React.forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("w-2 h-0.5 bg-muted-foreground/25", className)}
      {...props}
    />
  )
);

InputOTPSeparator.displayName = "InputOTPSeparator"; 