import { Colors } from "@/constants/colors";
import { Image, Text, View } from "react-native";

type PokemonCardProps = {
  id: string;
  name: string;
  image: string;
};

const PokemonCard = (props: PokemonCardProps) => {
  return (
    <View
      style={{
        borderRadius: 14,
        backgroundColor: Colors.grayscale.white,
        // shadowColor: Colors.grayscale.dark,
        // shadowOpacity: 0.2,
        // shadowRadius: 8,
        position: "relative",
        padding: 10,
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: Colors.grayscale.medium,
        }}
      >
        #{props.id}
      </Text>
      <View>
        <Image source={require("@/assets/images/silhouette.png")} style={{ width: 100, height: 100 }} />
        <View
          style={{
            backgroundColor: Colors.grayscale.background,
            width: "100%",
            paddingBottom: 10,
            paddingTop: 20,
            borderRadius: 14,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: Colors.grayscale.dark,
              textAlign: "center",
            }}
          >
            {props.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const PokemonCardSkeleton = () => {
  return <View></View>;
};

export { PokemonCard, PokemonCardSkeleton };
