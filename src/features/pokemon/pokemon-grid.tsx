import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { Text } from "@/components/text";

import { PokemonCard, PokemonCardSkeleton } from "@/features/pokemon/pokemon-card";

import { useDebounce } from "@/hooks/debounce";

import { fetchPokemon } from "@/api/pokemon";

import { Colors } from "@/constants/colors";

const PokemonGrid = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"id" | "name">("id");

  const debouncedFilters = {
    search: useDebounce(search, 500),
    sort: useDebounce(sort, 500),
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["pokemons", { ...debouncedFilters }],
    queryFn: () => fetchPokemon(),
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <>
      {isLoading && (
        <View>
          <PokemonCardSkeleton />
        </View>
      )}

      {isError && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.grayscale.dark,
            }}
          >
            Error : {error.message}
          </Text>
        </View>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 2,
              color: Colors.grayscale.dark,
            }}
          >
            No Pokémon found
          </Text>
          <Text style={{ textAlign: "center", color: Colors.grayscale.dark }}>Try ajusting your search</Text>
        </View>
      )}

      {data && data.length !== 0 && (
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
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </>
  );
};

export { PokemonGrid };
