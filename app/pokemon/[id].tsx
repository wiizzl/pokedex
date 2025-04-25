import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";

import { Icons } from "@/components/icons";
import { Text } from "@/components/text";

import { Badge } from "@/components/badge";
import { Colors } from "@/constants/colors";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href="/" />;

  const about = [
    { icon: <></>, value: "6.9 kg", label: "Weight" },
    { icon: <></>, value: "0.7 m", label: "Height" },
    { icon: null, value: "Chlorophyll Overgrow", label: "Moves" },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Link href="/" dismissTo>
                <Icons.chevronleft fill={Colors.grayscale.white} />
              </Link>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>{id}</Text>
            </View>
          ),
          headerRight: () => <Text style={{ fontSize: 18, marginTop: 5 }}>#001</Text>,
        }}
      />
      <View style={{ flex: 1, backgroundColor: Colors.pokemon.grass }}>
        <View style={{ display: "flex", alignItems: "flex-end", marginTop: 20, marginRight: 20 }}>
          <Image source={require("@/assets/images/pokeball.png")} style={{ width: 250, height: 250, opacity: 0.1 }} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.grayscale.white,
            marginHorizontal: 10,
            borderRadius: 18,
            padding: 20,
            paddingTop: 100,
            position: "relative",
          }}
        >
          <Image
            source={require("@/assets/image.png")}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: -140,
              left: "50%",
              marginLeft: -90,
            }}
          />
          <View style={{ marginTop: -30, gap: 25 }}>
            <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: 18 }}>
              <Badge color={Colors.pokemon.grass}>Grass</Badge>
              <Badge color={Colors.pokemon.poison}>Poison</Badge>
            </View>
            <View>
              <View style={{ gap: 8 }}>
                <Text style={{ color: Colors.pokemon.grass, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
                  About
                </Text>
                <View></View>
                <Text style={{ color: Colors.grayscale.dark }}>
                  There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows
                  larger.
                </Text>
              </View>
              <View style={{ gap: 8 }}>
                <Text style={{ color: Colors.pokemon.grass, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
                  Base Stats
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
