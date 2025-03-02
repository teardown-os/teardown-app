import { Text as RNText, type TextProps as RnTextProps } from "react-native";

export type TextProps = RnTextProps & {
 
}

export const Text = ({ children }: TextProps) => {
  return <RNText>{children}</RNText>;
};
