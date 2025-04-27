import { fetch } from "expo/fetch";

import type { PokemonDetails, PokemonList, Result } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

const fetchPokemonDetails = async (name: string) => {
  try {
    const data = await fetchData<PokemonDetails>(`${BASE_URL}/pokemon/${name}`);

    return data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
};

const fetchPokemonNames = async () => {
  try {
    const data = await fetchData<PokemonList>(`${BASE_URL}/pokemon/?limit=151`);

    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
    throw error;
  }
};

const fetchPokemonList = async (offset: number, limit: number) => {
  try {
    const data = await fetchData<PokemonList>(`${BASE_URL}/pokemon/?offset=${offset}&limit=${limit}`);

    const urls = data.results.map((pokemon: Result) => pokemon.url);
    const promises = await Promise.all(urls.map((url: string) => fetchData<PokemonDetails>(url)));

    return promises;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

const fetchSearchedPokemon = async (name: string) => {
  try {
    const data = await fetchData<PokemonDetails>(`${BASE_URL}/pokemon/${name}`);

    return data;
  } catch (error) {
    console.error(`Error searching for Pokémon ${name}:`, error);
    throw error;
  }
};

// const fetchType = async (endpoint: string) => {
//   try {
//     const data = await fetchData<PokemonDamageRelation>(endpoint);

//     const doubleDamageFrom = data.damage_relations.double_damage_from;
//     const halfDamageFrom = data.damage_relations.half_damage_from;
//     const noDamageFrom = data.damage_relations.no_damage_from;

//     return [doubleDamageFrom, halfDamageFrom, noDamageFrom];
//   } catch (error) {
//     console.error("Error fetching type data:", error);
//     return null;
//   }
// };

// const fetchFlavorText = async (id: number) => {
//   try {
//     const speciesData = await fetchData<PokemonSpecies>(`/pokemon-species/${id}`);
//     const flavorTextEntries = speciesData.flavor_text_entries[1].flavor_text;

//     return flavorTextEntries;
//   } catch (error) {
//     console.error("Error fetching flavor text:", error);
//     throw error;
//   }
// };

export { fetchPokemonDetails, fetchPokemonList, fetchPokemonNames, fetchSearchedPokemon };
