import { View } from "react-native";

import { Text } from "@/components/text";

type BadgeProps = {
  color: string;
  children: React.ReactNode;
};

const Badge = (props: BadgeProps) => {
  return (
    <View style={{ borderRadius: 50, backgroundColor: props.color, paddingVertical: 6, paddingHorizontal: 10 }}>
      <Text>{props.children}</Text>
    </View>
  );
};

export { Badge };
