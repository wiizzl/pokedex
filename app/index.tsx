import { FlatList, Pressable, SafeAreaView, View } from "react-native";

import { Icons } from "@/components/icons";
import { Input } from "@/components/input";

import { Colors } from "@/constants/colors";
import { PokemonCard } from "@/features/pokemon/pokemon-card";
import { Link } from "expo-router";

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
          padding: 30,
        }}
      >
        <FlatList
          data={[
            { id: "001", name: "Bulbasaur", image: "" },
            // { id: "002", name: "Charmander", image: "" },
            // { id: "003", name: "Squirtle", image: "" },
          ]}
          numColumns={3}
          renderItem={({ item }: { item: { id: string; name: string; image: string } }) => (
            <Link
              href={{
                pathname: "/pokemon/[id]",
                params: { id: item.id },
              }}
            >
              <PokemonCard id={item.id} name={item.name} image={item.image} />
            </Link>
          )}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ gap: 16 }}
          // contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
