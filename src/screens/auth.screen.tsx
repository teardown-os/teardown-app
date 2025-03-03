import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import React, { type FunctionComponent, useState } from "react";
import { TeardownLogo } from "@/assets/logos/teardown.logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScreenRoot, ScreenContent, ScreenFooter } from "@/components/ui/screen-container";
import type { ControllerRenderProps } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ScrollView } from "react-native";
import { ArrowRight, ArrowLeft } from "@/assets/icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutLeft,
  FadeOutUp,
  FadeOut
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useForm } from "@/components/ui/form";

export type AuthScreenProps = Record<string, never>;

type AuthMode = { type: "email" } | { type: "password"; email: string };

interface EmailFormValues {
  email: string;
}

interface PasswordFormValues {
  password: string;
}

const EmailForm: FunctionComponent<{
  onSubmit: (email: string) => void;
  onBack: () => void;
}> = ({ onSubmit, onBack }) => {
  const form = useForm<EmailFormValues>({
    defaultValues: {
      email: __DEV__ ? "chris@teardown.dev" : "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values: EmailFormValues) => {
    onSubmit(values.email);
  });

  return (
    <Form {...form}>
      <ScreenFooter sticky>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          exiting={FadeOutUp.duration(300)}
          className="mb-6"
        >
          <Text className="text-2xl font-bold text-primary mb-2">
            Enter your email address
          </Text>
          <Text className="text-muted-foreground mb-4">
            To continue to your Teardown dashboard, please enter your email address below.
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(200)} exiting={FadeOut.duration(300)}>
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email",
              },
            }}
            render={({ field }: { field: ControllerRenderProps<EmailFormValues, "email"> }) => (
              <FormItem>
                <FormLabel>Your work e-mail</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="name@company.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    submitBehavior={"submit"}
                    returnKeyType="next"
                    onSubmitEditing={handleSubmit}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          exiting={FadeOut.duration(300)}
          className="flex-col gap-4"
        >
          <Button
            onPress={handleSubmit}
            end={<ArrowRight size={22} />}
            isLoading={form.formState.isSubmitting}
          >
            Next
          </Button>
          <Button
            onPress={onBack}
            variant="outline"
            start={<ArrowLeft size={22} />}
            disabled={form.formState.isSubmitting}
          >
            Back
          </Button>
        </Animated.View>
      </ScreenFooter>
    </Form>
  );
};

const PasswordForm: FunctionComponent<{
  email: string;
  onSubmit: (password: string) => void;
  onBack: () => void;
}> = ({ email, onSubmit, onBack }) => {
  const form = useForm<PasswordFormValues>({
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values: PasswordFormValues) => {
    onSubmit(values.password);
  });

  return (
    <Form {...form}>
      <ScreenFooter sticky>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          exiting={FadeOutUp.duration(300)}
          className="mb-6"
        >
          <Text className="text-2xl font-bold text-primary mb-2">
            Enter your verification code
          </Text>
          <Text className="text-muted-foreground mb-4">
            Please enter the verification code sent to {email}
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(200)} exiting={FadeOut.duration(300)}>
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Code is required",
              minLength: {
                value: 6,
                message: "Please enter all 6 digits",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    onComplete={handleSubmit}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          exiting={FadeOut.duration(300)}
          className="flex-col gap-4"
        >
          <Button
            onPress={handleSubmit}
            end={<ArrowRight size={22} />}
            isLoading={form.formState.isSubmitting}
          >
            Verify
          </Button>
          <Button
            onPress={onBack}
            variant="outline"
            start={<ArrowLeft size={22} />}
            disabled={form.formState.isSubmitting}
          >
            Back
          </Button>
        </Animated.View>
      </ScreenFooter>
    </Form>
  );
};

export const AuthScreen: FunctionComponent<AuthScreenProps> = () => {
  const navigation = useNavigation();
  const [authMode, setAuthMode] = useState<AuthMode>({ type: "email" });

  const handleEmailSubmit = (email: string) => {
    // Prevent keyboard dismissal during transition
    requestAnimationFrame(() => {
      setAuthMode({ type: "password", email });
    });
  };

  const handlePasswordSubmit = async (password: string) => {
    // Implement login logic here
    console.log("Login with:", { email: (authMode as { email: string }).email, password });
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleBackFromEmail = () => {
    navigation.goBack();
  };

  const handleBackFromPassword = () => {
    setAuthMode({ type: "email" });
  };

  return (
    <ScreenRoot>
      <ScreenContent>
        <ScrollView />
      </ScreenContent>

      {authMode.type === "email" ? (
        <EmailForm
          onSubmit={handleEmailSubmit}
          onBack={handleBackFromEmail}
        />
      ) : (
        <PasswordForm
          email={authMode.email}
          onSubmit={handlePasswordSubmit}
          onBack={handleBackFromPassword}
        />
      )}
    </ScreenRoot>
  );
}; 