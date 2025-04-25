import { TextInput, TextInputProps } from "react-native";

import { Colors } from "@/constants/colors";

const Input = ({ style, ...props }: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={Colors.grayscale.medium}
      style={[
        {
          fontSize: 16,
          borderRadius: 50,
          backgroundColor: Colors.grayscale.white,
          color: "black",
          padding: 16,
        },
        style,
      ]}
      {...props}
    />
  );
};

export { Input };
