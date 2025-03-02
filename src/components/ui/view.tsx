import { View as RNView, type ViewProps as RnViewProps } from "react-native";

export type ViewProps = RnViewProps & {
 
}

export const View = ({ children }: ViewProps) => {
  return <RNView>{children}</RNView>;
};
