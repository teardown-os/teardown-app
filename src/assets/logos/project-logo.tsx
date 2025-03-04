



import type { FunctionComponent } from "react";
import type { SvgProps } from "react-native-svg";
import { AndroidLogo } from "./android-logo";
import { TeardownLogo } from "./teardown.logo";
import type { ProjectType } from "@/_sdk/modules/projects";
import { ReactNativeLogo } from "./react-native-logo";
import { AppleLogo } from "./apple-logo";
import { TauriLogo } from "./tauri-logo";

export type ProjectLogoProps = SvgProps & {
  projectType: ProjectType;
};

export const ProjectLogo: FunctionComponent<ProjectLogoProps> = (props) => {
  const { projectType, ...otherProps } = props;

  switch (projectType) {
    case "ANDROID":
      return <AndroidLogo {...otherProps} />;
    case "IOS":
      return <AppleLogo {...otherProps} />;
    case "REACT_NATIVE":
      return <ReactNativeLogo {...otherProps} />;
    case "REACT_NATIVE_EXPO":
      return <ReactNativeLogo {...otherProps} />;
    case "TAURI":
      return <TauriLogo {...otherProps} />;
    default:
      return null;
  }
};
