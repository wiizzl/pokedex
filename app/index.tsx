import { Pressable, SafeAreaView, View } from "react-native";

import { Icons } from "@/components/icons";
import { Input } from "@/components/input";

import { PokemonGrid } from "@/features/pokemon/pokemon-grid";

import { Colors } from "@/constants/colors";

export default function IndexScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.identity.primary }}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
          flexDirection: "row",
          gap: 25,
        }}
      >
        <Input placeholder="Search" style={{ flex: 1 }} />
        <Pressable
          style={{
            backgroundColor: Colors.grayscale.white,
            borderRadius: 50,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icons.filter fill={Colors.identity.primary} />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          backgroundColor: Colors.grayscale.white,
          marginHorizontal: 10,
          borderRadius: 18,
          paddingHorizontal: 20,
        }}
      >
        <PokemonGrid />
      </View>
    </SafeAreaView>
  );
}
