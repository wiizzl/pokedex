import { useInfiniteQuery } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/debounce";
import { useFilterStore } from "@/hooks/filter-store";

import { fetchPokemonList } from "@/api/pokemon";
import { Text } from "@/components/text";
import { Colors } from "@/constants/colors";
import { PokemonDetails } from "@/types/pokemon";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";
import { PokemonCard, PokemonCardSkeleton } from "./pokemon-card";

const PAGE_SIZE = 21;

const PokemonGrid = () => {
  const { search, sort } = useFilterStore();

  const debouncedFilters = {
    search: useDebounce(search, 500),
    sort: useDebounce(sort, 500),
  };

  const { data, isLoading, error, isError, fetchNextPage, hasNextPage, refetch, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["pokemonList"],
      queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam as number, PAGE_SIZE),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;

        return allPages.length * PAGE_SIZE;
      },
      initialPageParam: 0,
    }
  );

  const flatData = data?.pages?.flat() || [];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <>
      {isLoading && (
        <FlatList
          data={[...Array(12 * 2).keys()]}
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
          <Text style={{ textAlign: "center", color: Colors.grayscale.dark }}>Error : {error.message}</Text>
        </View>
      )}

      {!isLoading && !isError && flatData.length === 0 && (
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

      {flatData.length !== 0 && (
        <FlatList
          data={flatData}
          numColumns={3}
          renderItem={({ item }: { item: PokemonDetails }) => (
            <Link
              href={{
                pathname: "/pokemon/[id]",
                params: { id: item.id },
              }}
              style={{ marginVertical: 8 }}
            >
              <PokemonCard id={item.id} name={item.name} image={item.sprites.other?.home.front_default} />
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8, paddingTop: 8 }}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        />
      )}
    </>
  );
};

export { PokemonGrid };
