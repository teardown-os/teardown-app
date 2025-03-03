import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import React, { type FunctionComponent } from "react";
import { TeardownLogo } from "@/assets/logos/teardown.logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScreenRoot, ScreenContent, ScreenFooter } from "@/components/ui/screen-container";
import { useForm } from "react-hook-form";
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
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export type AuthScreenProps = Record<string, never>;

interface LoginFormValues {
  email: string;
  password: string;
}

export const AuthScreen: FunctionComponent<AuthScreenProps> = () => {

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "chris@teardown.dev",
      password: "",
    },
  });

  const onLoginPress = form.handleSubmit(async (values: LoginFormValues) => {
    // Implement login logic here
    console.log("Login with:", values);

    await new Promise(resolve => setTimeout(resolve, 2000));

    form.reset();
  });

  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <Form {...form}>

      <ScreenRoot>
        <ScreenContent>
          <ScrollView>
            {/* <View className="w-full pt-[25%] px-4">
              <Text className="text-3xl font-bold text-primary mb-6">
                Sign In
              </Text>
            </View> */}
          </ScrollView>
        </ScreenContent>

        <ScreenFooter sticky>
          <Animated.View entering={FadeInDown.duration(600).delay(200)} className="mb-6">
            <Text className="text-2xl font-bold text-primary mb-2">
              Enter your email address
            </Text>
            <Text className="text-muted-foreground mb-4">
              To continue to your Teardown dashboard, please enter your email address below.
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
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
              render={({ field }: { field: ControllerRenderProps<LoginFormValues, "email"> }) => (
                <FormItem>
                  <FormLabel>Your work e-mail</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="name@company.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(600).delay(200)} className="flex-col gap-4">
            <Button
              onPress={onLoginPress}
              end={<ArrowRight size={22} />}
              isLoading={form.formState.isSubmitting}
            >
              Next
            </Button>
            <Button
              onPress={onBackPress}
              variant="outline"
              start={<ArrowLeft size={22} />}
              disabled={form.formState.isSubmitting}
            >
              Back
            </Button>
          </Animated.View>
        </ScreenFooter>
      </ScreenRoot>
    </Form>

  );
}; 