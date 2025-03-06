import { teardown } from "@/_sdk";
import { ChevronDown, User } from "@/assets/icons";
import { ProjectLogo } from "@/assets/logos/project-logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useOrganisation } from "@/contexts/organisation.context";
import { useProject } from "@/contexts/project.context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";

import React, { type FunctionComponent } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export type HomeScreenProps = Record<string, never>;

export const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
	const { selectedProject, setSelectedProject } = useProject();
	const { selectedOrganisation } = useOrganisation();
	const insets = useSafeAreaInsets();

	const handleChangeProject = () => {
		setSelectedProject(null);
	};

	return (
		<Animated.View className="flex flex-1 bg-background" entering={FadeIn.duration(400)} exiting={FadeOut.duration(400)}>
			{/* Header */}
			<View
				className="px-6 pb-4"
				style={{ paddingTop: insets.top + 16 }}
			>
				<View className="flex-row items-center justify-between mb-1">
					<Text variant="subhead" color="secondary">
						{selectedOrganisation?.name}
					</Text>
					<Pressable
						onPress={() => teardown.auth.api.signOut()}
						className="p-2 -mr-2"
					>
						<User size={20} className="text-muted-foreground" />
					</Pressable>
				</View>
				<Pressable
					onPress={handleChangeProject}
					className="flex-row items-center border-b border-border/50 pb-3"
				>
					{selectedProject?.project_type && (
						<View className="bg-primary/10 p-2 rounded-lg mr-3">
							<ProjectLogo
								projectType={selectedProject.project_type}
								className="w-6 h-6"
							/>
						</View>
					)}
					<Text variant="title1" className="font-semibold flex-1">
						{selectedProject?.name}
					</Text>
					<ChevronDown size={20} className="text-muted-foreground" />
				</Pressable>
			</View>
		</Animated.View>
	);
};
