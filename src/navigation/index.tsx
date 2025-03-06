import {
  createStaticNavigation,
  NavigationProp,
  ParamListBase,
  RouteProp,
  type StaticParamList,
} from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/_sdk/modules/auth";
import {
  OrganisationProvider,
  useOrganisation,
} from "@/contexts/organisation.context";
import { ProjectProvider, useProject } from "@/contexts/project.context";
import { OrganisationsScreen } from "@/screens/organisations.screen";
import { ProjectsScreen } from "@/screens/projects.screen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import type * as React from "react";
import { AuthScreen } from "../screens/auth.screen";
import { HomeScreen } from "../screens/home.screen";
import { WelcomeScreen } from "../screens/welcome.screen";
import { View } from "@/components/ui/view";
import { colors } from "@/theme/colors";

const use_UserIsSignedIn = () => {
  const session = useAuth();
  return session != null;
};

const use_UserIsSignedOut = () => {
  return !use_UserIsSignedIn();
};

const useHasOrganisation = () => {
  const { selectedOrganisation } = useOrganisation();
  return selectedOrganisation != null;
};

const useHasProject = () => {
  const { selectedProject } = useProject();
  return selectedProject != null;
};

const use_UserNeedsOrganisationSet = () => {

  const isSignedIn = use_UserIsSignedIn();
  const hasOrganisation = useHasOrganisation();

  return isSignedIn && !hasOrganisation;
};

const use_UserNeedsProjectSet = () => {
  const isSignedIn = use_UserIsSignedIn();
  const hasOrganisation = useHasOrganisation();
  const hasProject = useHasProject();

  return isSignedIn && hasOrganisation && !hasProject;
};

const use_UserHasProjectSet = () => {
  const isSignedIn = use_UserIsSignedIn();
  const hasOrganisation = useHasOrganisation();
  const hasProject = useHasProject();

  return isSignedIn && hasOrganisation && hasProject;
};

const MainStack = createStackNavigator({
  screens: {
    HomeScreen,
  },
  screenOptions: {
    headerShown: false,
    headerBackTitle: "Back",
    cardStyle: {
      backgroundColor: colors.dark.background,
    },
  },
});

const Layout = <ParamList extends ParamListBase, Navigation>(props: {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: Navigation;
  theme: ReactNavigation.Theme;
  children: React.ReactElement;
}) => {
  return (
    <View className="flex-1 bg-background">
      {props.children}
    </View>
  );
};

const RootStack = createStackNavigator({
  screens: {},
  groups: {
    Auth: {
      if: use_UserIsSignedOut,
      screens: {
        Welcome: WelcomeScreen,
        Auth: AuthScreen,
      },
    },
    Organisation: {
      if: use_UserNeedsOrganisationSet,
      screens: {
        Organisation: OrganisationsScreen,
      },
    },
    Project: {
      if: use_UserNeedsProjectSet,
      screens: {
        Project: ProjectsScreen,
      },
    },
    App: {
      if: use_UserHasProjectSet,
      screens: {
        Main: MainStack,
      },
    },
  },
  screenLayout: Layout,
  screenOptions: {
    headerShown: false,
    cardStyle: {
      backgroundColor: colors.dark.background,
    },
    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export const Navigation = () => {
  return (
    <OrganisationProvider>
      <ProjectProvider>
        <StaticNavigation />
      </ProjectProvider>
    </OrganisationProvider>
  );
};
