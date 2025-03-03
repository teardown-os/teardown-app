import {
  type FunctionComponent,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// import type { UpdaterStatus } from "../modules/updater/updater.service.ts";
import { TeardownLogo } from "@/assets/logos/teardown.logo.tsx";
import { View } from "@/components/ui/view.tsx";
import { AuthScreen } from "@/screens/auth.screen.tsx";
import { teardown } from "@/_sdk";
import { Loading } from "@/components/ui/loading.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TeardownUserSession } from "../modules/auth";
import { AppState } from "react-native";
import { Spinner } from "@/components/ui/spinner";

export type TeardownContainerProps = PropsWithChildren;

type AppLoadingState = {
  // updater: UpdaterStatus;
  authLoaded: boolean;
};

const LoadingWithSignOut: FunctionComponent = () => {
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignOut(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Loading id="alpha-container">
      {showSignOut && (
        <Button onPress={() => teardown.auth.api.signOut()}>Sign Out</Button>
      )}
    </Loading>
  );
};


export const TeardownContainer: FunctionComponent<TeardownContainerProps> = (
  props,
) => {
  const { children } = props;
  const [authState, setAuthState] = useState<TeardownUserSession | null>(teardown.auth.getSession());

  const [loadingState, setLoadingState] = useState<AppLoadingState>({
    // updater: teardown.updater.getStatus(),
    authLoaded: authState != null,
  });

  const setAuth = useCallback((session: TeardownUserSession | null) => {
    setAuthState(session);
    setLoadingState((prev) => ({ ...prev, authLoaded: true }));
  }, []);


  useEffect(() => {
    const unsub1 = teardown.auth.onAuthStateChange((payload) => {
      console.log("TeardownContainer onAuthStateChange", payload);
      setAuth(payload.session);
    });

    setAuth(teardown.auth.getSession());

    return () => {
      unsub1();
    };
  }, [setAuth]);

  const isLoading = !loadingState.authLoaded //|| loadingState.updater.isBlocking;

  if (isLoading) {
    return <View className="flex-1 items-center justify-center">
      <Spinner variant="secondary" />
    </View>;
  }

  // if (authState == null) {
  //   return <AuthScreen />;
  // }

  return (
    children
  );
};

const useProvidedState = () => {
  const [session, setSession] = useState<
    TeardownUserSession | null | undefined
  >(undefined);

  const handleSession = useCallback((sessionIn: TeardownUserSession | null) => {
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



AppState.addEventListener("change", (state) => {
  if (state === "active") {
    teardown.auth.api.startAutoRefresh();
  } else {
    teardown.auth.api.stopAutoRefresh();
  }
});

const LoadingState: FunctionComponent<{ loadingState: AppLoadingState }> = ({
  loadingState,
}) => {
  // const progress = useLoadingProgress(loadingState);
  // const loadingMessage = useLoadingMessage(loadingState);

  return (
    <View className="flex-1 flex flex-col items-center justify-center gap-8">
      <TeardownLogo className="w-12 h-12" />
      <View className="flex flex-col items-center gap-4">
        {/* <Progress value={progress} className="w-40 h-1" /> */}
        {/* <span className="text-sm text-muted-foreground">{loadingMessage}</span> */}
      </View>
    </View>
  );
};

// function useLoadingProgress(loadingState: AppLoadingState): number {
//   return useMemo(() => {
//     const { updater } = loadingState;

//     // Update base progress weights to split between auth and updater
//     const weights = {
//       updater: 50,
//       auth: 50,
//     };

//     let progress = 0;

//     // Add progress for completed checks
//     if (loadingState.authLoaded) progress += weights.auth;

//     // Calculate updater progress
//     switch (updater.type) {
//       case "IDLE":
//         progress += weights.updater;
//         break;
//       case "CHECKING":
//         progress += weights.updater * 0.2;
//         break;
//       case "UPDATE_AVAILABLE":
//         progress += weights.updater * 0.3;
//         break;
//       case "DOWNLOADING":
//         progress +=
//           weights.updater * (0.2 + (updater.progress / updater.total) * 0.6);
//         break;
//       case "DOWNLOAD_FINISHED":
//         progress += weights.updater * 0.9;
//         break;
//       case "INSTALLING":
//         progress += weights.updater * 0.95;
//         break;
//       case "ERROR":
//         progress += weights.updater * 0.99;
//         break;
//     }

//     return Math.max(5, Math.min(100, progress));
//   }, [loadingState]);
// }

// function useLoadingMessage(loadingState: AppLoadingState): string {
//   return useMemo(() => {
//     const { updater } = loadingState;

//     if (!loadingState.authLoaded) {
//       return "";
//     }

//     if (updater.type === "DOWNLOADING") {
//       const percentage = Math.round((updater.progress / updater.total) * 100);
//       console.log("DOWNLOADING", updater.progress, updater.total, percentage);
//       return `Downloading update (${percentage}%)`;
//     }

//     if (updater.type === "DOWNLOAD_FINISHED") {
//       return "Download finished";
//     }

//     if (updater.type === "INSTALLING") {
//       return "Installing update";
//     }

//     if (updater.type === "ERROR") {
//       return `Error downloading update: ${updater.message}`;
//     }

//     return "";
//   }, [loadingState]);
// }


