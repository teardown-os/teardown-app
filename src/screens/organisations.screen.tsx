import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { useOrganisation } from "@/contexts/organisation.context";
import { ScrollView } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from "react-native-reanimated";
import { Pressable } from "react-native";
import { ScreenContent, ScreenRoot } from "@/components/ui/screen-container";
import { useNavigation } from "@react-navigation/native";
import type { Organisation } from "@/_sdk/modules/organisations/organisation";
import { Button } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { teardown } from "@/_sdk";
import { LogOut } from "@/assets/icons";
import { FunctionComponent } from "react";

type OrganisationsScreenProps = {};

const OrganisationCardSkeleton = ({ index }: { index: number }) => {
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

const EmptyOrganisationCard = ({ onPress }: { onPress: () => void }) => {
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
        <Text className="text-lg font-semibold mb-2 text-center">Create your first organization</Text>
        <Text className="text-muted-foreground text-sm text-center mb-4">
          Get started by creating a personal or team organization
        </Text>
        <Button variant="secondary" size="sm">
          Create Organization
        </Button>
      </Pressable>
    </Animated.View>
  );
};

const OrganisationCard = ({
  organisation,
  onSelect,
  index,
}: {
  organisation: Organisation;
  onSelect: () => void;
  index: number;
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(400).delay(index * 100)}
      exiting={FadeOut.duration(400)}
      className="mb-4"
    >
      <Pressable
        onPress={onSelect}
        className="bg-gradient-to-br from-card to-card/90 rounded-xl p-4 border border-border/50 active:scale-98 active:opacity-80 transition-transform"
      >
        <Text className="text-lg font-semibold mb-1">{organisation.name}</Text>
        <Text className="text-muted-foreground text-sm">
          {organisation.type === "PERSONAL" ? "Personal" : "Team"} Organization
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export const OrganisationsScreen = (props: OrganisationsScreenProps) => {
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await teardown.auth.api.signOut();
  };

  const renderContent = () => {

  };

  return (
    <ScreenRoot>
      <ScreenContent>
        <ScrollView className="flex-1" stickyHeaderIndices={[1]}>
          <View className="h-[25vh]" />
          <Animated.View
            entering={FadeInDown.duration(400)}
            exiting={FadeOut.duration(400)}
            className="mb-6 bg-background p-4">
            <Text className="text-2xl font-bold text-primary mb-2">
              Select an organization
            </Text>
            <Text className="text-muted-foreground">
              Choose an organization to continue to your dashboard
            </Text>
          </Animated.View>

          <View className="px-4 pb-48">
            <Content />
          </View>
        </ScrollView>

        <Animated.View
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(400)}
          // className="absolute left-0 right-0 px-4 items-center justify-center"
          style={{ bottom: insets.bottom + 16 }}
        >
          <View className="items-center justify-center ">
            <Button
              variant="outline"
              size="sm"
              layout="wrap"
              onPress={handleLogout}
              start={<LogOut />}
            >
              Logout
            </Button>
          </View>
        </Animated.View>
      </ScreenContent>
    </ScreenRoot>
  );
};


const Content: FunctionComponent = () => {

  const { organisations, setSelectedOrganisation, isLoading } = useOrganisation();

  const handleSelectOrganisation = (organisation: Organisation) => {
    setSelectedOrganisation(organisation);
  };

  const handleCreateOrganisation = () => {

  };

  if (isLoading || organisations == null) {
    return Array.from({ length: 3 }).map((_, index) => (
      <OrganisationCardSkeleton key={index} index={index} />
    ));
  }

  if (!organisations.length) {
    console.log("No organisations");
    return <EmptyOrganisationCard onPress={handleCreateOrganisation} />;
  }

  return organisations.map((org, index) => (
    <OrganisationCard
      key={org.id}
      organisation={org}
      onSelect={() => handleSelectOrganisation(org)}
      index={index}
    />
  ));
};