import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { Text } from "@/components/text";

import { PokemonCard, PokemonCardSkeleton } from "@/features/pokemon/pokemon-card";

import { useDebounce } from "@/hooks/debounce";

import { fetchPokemon, fetchPokemonDetails } from "@/api/pokemon";

import { Colors } from "@/constants/colors";
import { useFilterStore } from "@/hooks/filter-store";
import { Pokemon, PokemonListResult } from "@/types/pokemon";

const PokemonGrid = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { search, sort } = useFilterStore();

  const debouncedFilters = {
    search: useDebounce(search, 500),
    sort: useDebounce(sort, 500),
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["pokemons", { ...debouncedFilters }],
    queryFn: () =>
      fetchPokemon([
        { key: "limit", value: "15" },
        { key: "offset", value: "0" },
      ]),
  });

  const {
    data: pokemonDetails,
    isLoading: isDetailsLoading,
    refetch: detailsRefetch,
  } = useQuery({
    queryKey: ["pokemonDetails", data?.results],
    queryFn: () => Promise.all(data?.results.map((item: PokemonListResult) => fetchPokemonDetails(item.url)) || []),
    enabled: !!data?.results,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await detailsRefetch();
    setRefreshing(false);
  };

  return (
    <>
      {(isLoading || isDetailsLoading) && (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          numColumns={3}
          renderItem={() => (
            <View style={{ marginVertical: 8 }}>
              <PokemonCardSkeleton />
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8, paddingTop: 8 }}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
        />
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

      {!isLoading && !isError && pokemonDetails?.length === 0 && (
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
          <Text style={{ textAlign: "center", color: Colors.grayscale.dark }}>Try adjusting your search</Text>
        </View>
      )}

      {pokemonDetails && pokemonDetails.length !== 0 && (
        <FlatList
          data={pokemonDetails}
          numColumns={3}
          renderItem={({ item }: { item: Pokemon }) => (
            <Link
              href={{
                pathname: "/pokemon/[id]",
                params: { id: item.id },
              }}
              style={{ marginVertical: 8 }}
            >
              <PokemonCard
                id={item.id}
                name={item.name}
                image={item.sprites.other?.["official-artwork"].front_default!}
              />
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8, paddingTop: 8 }}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </>
  );
};

export { PokemonGrid };
