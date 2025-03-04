import { teardown } from "@/_sdk";
import { Home } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import { useOrganisation } from "@/contexts/organisation.context";
import { useProject } from "@/contexts/project.context";

import React, { type FunctionComponent } from "react";

export type HomeScreenProps = Record<string, never>;

export const HomeScreen: FunctionComponent<HomeScreenProps> = () => {

	const { selectedProject, setSelectedProject } = useProject();
	const { selectedOrganisation, setSelectedOrganisation } = useOrganisation();

	const handleChangeProject = () => {
		setSelectedProject(null);
	};

	const handleChangeOrganisation = () => {
		setSelectedOrganisation(null);
	};


	return (
		<View className="flex flex-1 items-center justify-center gap-8 bg-background">
			<Button onPress={handleChangeProject}>Change project</Button>
			<Button onPress={handleChangeOrganisation}>Change organisation</Button>
			<Button onPress={() => teardown.auth.api.signOut()}>Sign Out</Button>
		</View>
	);
};
