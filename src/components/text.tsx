import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { Colors } from "@/constants/colors";

type TextProps = RNTextProps & {
  children: React.ReactNode;
};

const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText style={[{ color: Colors.grayscale.white }, style]} {...props}>
      {children}
    </RNText>
  );
};

export { Text };
