import { teardown } from "@/_sdk";
import { Home } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";

import React, { type FunctionComponent } from "react";

export type HomeScreenProps = Record<string, never>;

export const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
	return (
		<View className="flex flex-1 items-center justify-center gap-8 bg-background">
			<Button onPress={() => teardown.auth.api.signOut()}>Sign Out</Button>
		</View>
	);
};
