import { Pressable, SafeAreaView, View } from "react-native";

import { Icons } from "@/components/icons";
import { Input } from "@/components/input";

import { PokemonGrid } from "@/features/pokemon/pokemon-grid";

import { useFilterStore } from "@/hooks/filter-store";

import { Colors } from "@/constants/colors";

export default function IndexScreen() {
  const { search, sort, setSearch, setSort } = useFilterStore();
  const isSortedById = sort === "id";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.identity.primary }}>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
          flexDirection: "row",
          gap: 25,
        }}
      >
        <Input placeholder="Search" style={{ flex: 1 }} value={search} onChangeText={setSearch} />
        <Pressable
          onPress={() => setSort(isSortedById ? "name" : "id")}
          style={{
            backgroundColor: Colors.grayscale.white,
            borderRadius: 50,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSortedById ? (
            <Icons.hashtag fill={Colors.identity.primary} />
          ) : (
            <Icons.aletter fill={Colors.identity.primary} />
          )}
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 25,
          backgroundColor: Colors.grayscale.white,
          marginHorizontal: 8,
          borderRadius: 18,
        }}
      >
        <PokemonGrid />
      </View>
    </SafeAreaView>
  );
}
