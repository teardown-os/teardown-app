import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import React, { type FunctionComponent, useEffect } from "react";
import { TeardownLogo } from "@/assets/logos/teardown.logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/assets/icons";
import { useNavigation } from "@react-navigation/native";
import { ScreenFooter, ScreenContent, ScreenRoot } from "@/components/ui/screen-container";
import { ScrollView } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export type WelcomeScreenProps = Record<string, never>;

export const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = () => {
  const navigation = useNavigation();

  const onGetStartedPress = () => {
    navigation.navigate("Auth");
  }

  return (
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
      <View className="absolute top-0 left-0 bottom-0 right-0 justify-center items-center">
        <TeardownLogo className="w-10 h-10" />
      </View>
      <ScreenFooter sticky>
        <Animated.View entering={FadeInDown.duration(600).delay(200)} className="mb-6">
          <Text className="text-2xl font-bold text-primary mb-2">
            Welcome to Teardown
          </Text>
          <Text className="text-muted-foreground mb-4">
            Your all-in-one tool for managing your mobile releases, from your
            mobile.
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Button className="" end={<ArrowRight size={22} />} onPress={onGetStartedPress}>
            Get Started
          </Button>
        </Animated.View>
      </ScreenFooter>
    </ScreenRoot>
  );
};
