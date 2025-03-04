import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { useProject } from "@/contexts/project.context";
import { ScrollView } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from "react-native-reanimated";
import { Pressable } from "react-native";
import { ScreenContent, ScreenRoot } from "@/components/ui/screen-container";
import { useNavigation } from "@react-navigation/native";
import type { Project } from "@/_sdk/modules/projects/project";
import { Button, ButtonText } from "@/components/ui/button";
import { useOrganisation } from "@/contexts/organisation.context";
import { ProjectLogo } from "@/assets/logos/project-logo";
import { Chip } from "@/components/ui/chip";
import { ArrowLeft } from "@/assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProjectsScreenProps = {};

const ProjectCardSkeleton = ({ index }: { index: number }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 100)}
      exiting={FadeOut.duration(400)}
      className="mb-4"
    >
      <View className="bg-card/50 rounded-lg p-4 border border-border">
        <View className="bg-muted-foreground/10 rounded h-6 w-3/4 mb-2" />
        <View className="bg-muted-foreground/10 rounded h-4 w-1/2" />
      </View>
    </Animated.View>
  );
};

const EmptyProjectCard = ({ onPress }: { onPress: () => void }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      exiting={FadeOut.duration(400)}
      className="mb-4"
    >
      <Pressable
        onPress={onPress}
        className="bg-card/50 rounded-lg p-6 border border-dashed border-border active:opacity-70 items-center"
      >
        <Text className="text-lg font-semibold mb-2 text-center">Create your first project</Text>
        <Text className="text-muted-foreground text-sm text-center mb-4">
          Get started by creating a new project
        </Text>
        <Button variant="secondary" size="sm">
          Create Project
        </Button>
      </Pressable>
    </Animated.View>
  );
};

const ProjectCard = ({
  project,
  onSelect,
  index,
}: {
  project: Project;
  onSelect: () => void;
  index: number;
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(400).delay(index * 100)}
      className="mb-4"
    >
      <Pressable
        onPress={onSelect}
        className="bg-gradient-to-br from-card to-card/90 rounded-xl p-4 border border-border/50 active:scale-98 active:opacity-80 transition-transform shadow-sm"
      >
        <View className="flex-row items-center justify-between gap-3">
          <View className="bg-primary/10 p-2.5 rounded-lg w-10 h-10">
            <ProjectLogo projectType={project.project_type} />
          </View>
          <View className="flex-1 flex-row items-center justify-between gap-2">
            <Text className="text-xl font-bold text-foreground mb-1" numberOfLines={1}>
              {project.name}
            </Text>
            <View className="flex-row items-center gap-2">
              <Chip variant="default" size="sm">
                {project.project_type}
              </Chip>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export const ProjectsScreen = (props: ProjectsScreenProps) => {
  const { projects, setSelectedProject, isLoading } = useProject();
  const { selectedOrganisation, setSelectedOrganisation } = useOrganisation();

  const insets = useSafeAreaInsets();

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCreateProject = () => {

  };

  const handleChangeOrganisation = () => {
    setSelectedOrganisation(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <ProjectCardSkeleton key={index} index={index} />
      ));
    }

    if (!projects?.length) {
      return <EmptyProjectCard onPress={handleCreateProject} />;
    }

    return projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        project={project}
        onSelect={() => handleSelectProject(project)}
        index={index}
      />
    ));
  };

  return (
    <ScreenRoot>
      <ScreenContent>
        <ScrollView className="flex-1" stickyHeaderIndices={[1]}>
          <View className="h-[25vh]" />
          <Animated.View entering={FadeInDown.duration(400)} className="mb-6 bg-background p-4">
            <Text className="text-2xl font-bold text-primary mb-2">
              Select a project
            </Text>
            <Text className="text-muted-foreground">
              Choose a project in {selectedOrganisation?.name} to continue to your dashboard
            </Text>
          </Animated.View>

          <View className="px-4">
            {renderContent()}

            {/* {Array.from({ length: 15 }).map((_, index) => (
              <ProjectCardSkeleton key={index} index={index} />
            ))} */}
          </View>
        </ScrollView>

        <Animated.View
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(400)}
          className="absolute left-0 right-0 px-4 items-center justify-center"
          style={{ bottom: insets.bottom + 16 }}
        >
          <View>
            <Button
              variant="outline"
              size="sm"
              layout="wrap"
              onPress={handleChangeOrganisation}
              start={<ArrowLeft size={20} />}
            >
              Switch org
            </Button>
          </View>
        </Animated.View>
      </ScreenContent>
    </ScreenRoot>
  );
}; 