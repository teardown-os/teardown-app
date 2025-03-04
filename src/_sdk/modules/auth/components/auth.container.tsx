import { teardown } from "@/_sdk";
import { Spinner } from "@/components/ui/spinner";
import {
  createContext,
  type FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ScrollView, View } from "react-native";
import type { TeardownUserSession } from "../auth.service";
import { Loading } from "@/components/ui/loading";
import { ScreenContent } from "@/components/ui/screen-container";
import { ScreenRoot } from "@/components/ui/screen-container";
import { TeardownLogo } from "@/assets/logos/teardown.logo";

const AuthContext = createContext<TeardownUserSession | null>(null);

export const useAuth = () => {
  const session = useContext(AuthContext);

  return session;
};

type AuthContainerProps = {
  children: React.ReactNode;
};

export const AuthContainer: FunctionComponent<AuthContainerProps> = (props) => {
  const { children } = props;

  const state = useProvidedState();

  if (!state.initialized) {
    return (
      <ScreenRoot>
        <View className="absolute top-0 left-0 bottom-0 right-0 justify-center items-center">
          <TeardownLogo className="w-10 h-10" />
        </View>
      </ScreenRoot>
    );
  }

  const session = state.session;

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

const useProvidedState = () => {
  const [session, setSession] = useState<
    TeardownUserSession | null | undefined
  >(undefined);

  const handleSession = useCallback((sessionIn: TeardownUserSession | null) => {
    console.log("handleSession", sessionIn);

    if (sessionIn != null) {
      // datadogRum.setUser({
      // 	id: sessionIn.user.id,
      // 	email: sessionIn.user.email,
      // 	version: import.meta.env.VITE_APP_VERSION,
      // 	buildNumber: import.meta.env.VITE_BUILD_NUMBER,
      // });

      setSession(sessionIn);
    } else {
      // void teardown.queryClient.clear();
      // Sentry.setUser(null);
      setSession(null);
    }
  }, []);

  useEffect(() => {
    const listener = teardown.auth.onAuthStateChange((payload) => {
      handleSession(payload.session);
    });

    const session = teardown.auth.getSession();
    handleSession(session);

    return () => {
      listener();
    };
  }, [handleSession]);

  return {
    initialized: session !== undefined,
    session: session ?? null,
  };
};
