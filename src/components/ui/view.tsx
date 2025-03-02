import { View as RNView, type ViewProps as RnViewProps } from "react-native";

export type ViewProps = RnViewProps & {
}

export const View = ({ children, ...props }: ViewProps) => {
  return <RNView {...props}>{children}</RNView>;
};
