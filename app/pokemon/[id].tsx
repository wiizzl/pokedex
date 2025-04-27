import { useQuery } from "@tanstack/react-query";
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, View } from "react-native";

import { Badge } from "@/components/badge";
import { Icons } from "@/components/icons";
import { Progress } from "@/components/progress";
import { Text } from "@/components/text";

import { fetchPokemonDetails } from "@/api/pokemon";

import { Colors } from "@/constants/colors";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href="/" />;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["pokemonDetails"],
    queryFn: () => fetchPokemonDetails(id.toString()),
  });

  const getColorFromType = (type: string) => {
    return Colors.pokemon[type as keyof typeof Colors.pokemon];
  };

  const colorType = Colors.pokemon[data?.types[0].type.name as keyof typeof Colors.pokemon];

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
              <Text style={{ fontSize: 28, fontWeight: "bold", textTransform: "capitalize" }}>{data?.name}</Text>
            </View>
          ),
          headerRight: () => (
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>#{id.toString().padStart(4, "0")}</Text>
          ),
        }}
      />
      <View style={{ alignItems: "flex-end", backgroundColor: colorType }}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={{ width: 220, height: 220, opacity: 0.1, marginVertical: 10, marginRight: 10 }}
        />
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorType }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.grayscale.white,
            marginHorizontal: 10,
            borderRadius: 18,
            padding: 20,
            paddingTop: 100,
            position: "relative",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: data?.sprites.other?.["official-artwork"].front_default }}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: -140,
            }}
          />
          <View style={{ flex: 1, marginTop: -40, gap: 15 }}>
            <View style={{ justifyContent: "center", flexDirection: "row", gap: 18 }}>
              {data?.types.map((item, index) => (
                <Badge color={getColorFromType(item.type.name)} style={{ textTransform: "capitalize" }} key={index}>
                  {item.type.name}
                </Badge>
              ))}
            </View>
            <View>
              <View style={{ gap: 8 }}>
                <Text style={{ color: colorType, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>About</Text>
                <View></View>
                <Text style={{ color: Colors.grayscale.dark }}>
                  There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows
                  larger.
                </Text>
              </View>
              <View style={{ gap: 8 }}>
                <Text style={{ color: colorType, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
                  Base Stats
                </Text>
                <View style={{ flexDirection: "row", gap: 18 }}>
                  <View
                    style={{ borderRightColor: Colors.grayscale.light, borderRightWidth: 1, paddingRight: 18, gap: 2 }}
                  >
                    {stats.map((item, index) => (
                      <Text
                        style={{ color: colorType, fontWeight: "bold", fontSize: 18, textAlign: "right" }}
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
                        <Progress value={item.value / 100} color={colorType} />
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
