import { Colors } from "@/constants/colors";
import { Image, Text, View } from "react-native";

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
};

const PokemonCard = (props: PokemonCardProps) => {
  return (
    <View
      style={{
        borderRadius: 14,
        backgroundColor: Colors.grayscale.white,
        shadowColor: Colors.grayscale.dark,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4,
      }}
    >
      <Text
        style={{
          textAlign: "right",
          color: Colors.grayscale.medium,
          marginTop: 10,
          marginRight: 10,
        }}
      >
        #{props.id.toString().padStart(3, "0")}
      </Text>
      <View
        style={{
          // backgroundColor: Colors.grayscale.background,
          paddingBottom: 10,
          borderRadius: 14,
        }}
      >
        <Image source={{ uri: props.image }} style={{ width: 105, height: 105 }} />
        <Text
          style={{
            fontSize: 12,
            textTransform: "capitalize",
            fontWeight: "500",
            color: Colors.grayscale.dark,
            textAlign: "center",
          }}
        >
          {props.name}
        </Text>
      </View>
    </View>
  );
};

const PokemonCardSkeleton = () => {
  return (
    <View>
      <Text style={{ color: Colors.grayscale.dark }}>Loading...</Text>
    </View>
  );
};

export { PokemonCard, PokemonCardSkeleton };
