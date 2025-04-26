import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, View } from "react-native";

import { Icons } from "@/components/icons";
import { Text } from "@/components/text";

import { Badge } from "@/components/badge";
import { Progress } from "@/components/progress";
import { Colors } from "@/constants/colors";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href="/" />;

  const about = [
    { icon: <></>, value: "6.9 kg", label: "Weight" },
    { icon: <></>, value: "0.7 m", label: "Height" },
    { icon: null, value: "Chlorophyll Overgrow", label: "Moves" },
  ];

  const stats = [
    { label: "HP", value: 45 },
    { label: "ATK", value: 49 },
    { label: "DEF", value: 49 },
    { label: "SATK", value: 65 },
    { label: "SDEF", value: 65 },
    { label: "SPD", value: 45 },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Link href="/" dismissTo>
                <Icons.chevronleft fill={Colors.grayscale.white} />
              </Link>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>Bulbasaur</Text>
            </View>
          ),
          headerRight: () => <Text style={{ fontSize: 16, fontWeight: "bold" }}>#001</Text>,
        }}
      />
      <View style={{ alignItems: "flex-end", backgroundColor: Colors.pokemon.grass }}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={{ width: 220, height: 220, opacity: 0.1, marginVertical: 10, marginRight: 10 }}
        />
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.pokemon.grass }}>
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
            source={require("@/assets/images/silhouette.png")}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: -140,
              left: "50%",
              marginLeft: -90,
            }}
          />
          <View style={{ flex: 1, marginTop: -40, gap: 15 }}>
            <View style={{ justifyContent: "center", flexDirection: "row", gap: 18 }}>
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
                <View style={{ flexDirection: "row", gap: 18 }}>
                  <View
                    style={{ borderRightColor: Colors.grayscale.light, borderRightWidth: 1, paddingRight: 18, gap: 2 }}
                  >
                    {stats.map((item, index) => (
                      <Text
                        style={{ color: Colors.pokemon.grass, fontWeight: "bold", fontSize: 18, textAlign: "right" }}
                        key={index}
                      >
                        {item.label}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    {stats.map((item, index) => (
                      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }} key={index}>
                        <Text style={{ color: Colors.grayscale.dark, fontSize: 18 }}>
                          {item.value.toString().padStart(4, "0")}
                        </Text>
                        <Progress value={item.value / 100} color={Colors.pokemon.grass} />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
