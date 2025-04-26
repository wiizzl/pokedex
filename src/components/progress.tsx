import React from "react";
import { View, ViewProps } from "react-native";

type ProgressBarProps = ViewProps & {
  value: number;
  color: string;
};

const Progress = ({ style, ...props }: ProgressBarProps) => {
  return (
    <View
      style={[
        {
          height: 8,
          backgroundColor: `${props.color}33`,
          borderRadius: 4,
          flex: 1,
        },
        style,
      ]}
      {...props}
    >
      <View
        style={{
          width: `${Math.max(0, Math.min(1, props.value)) * 100}%`,
          height: "100%",
          backgroundColor: props.color,
          borderRadius: 4,
        }}
      />
    </View>
  );
};

export { Progress };
