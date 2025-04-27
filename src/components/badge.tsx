import { TextProps, View } from "react-native";

import { Text } from "@/components/text";

type BadgeProps = TextProps & {
  color: string;
  children: React.ReactNode;
};

const Badge = ({ style, ...props }: BadgeProps) => {
  return (
    <View style={{ borderRadius: 50, backgroundColor: props.color, paddingVertical: 6, paddingHorizontal: 10 }}>
      <Text style={style}>{props.children}</Text>
    </View>
  );
};

export { Badge };
