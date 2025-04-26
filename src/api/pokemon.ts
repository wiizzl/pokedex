import { fetch } from "expo/fetch";

import type { Pokemon, PokemonList } from "@/types/pokemon";

interface Parameter {
  key: string;
  value: string;
}

const fetchPokemon = async (parameters: Parameter[] = [], path: string = "") => {
  const queryParams = parameters.length ? "?" + parameters.map((param) => `${param.key}=${param.value}`).join("&") : "";
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon${path}${queryParams}`);

  if (!response.ok) console.warn("Error fetching data from PokeAPI (fetchPokemon)");

  const data = await response.json();

  return data as PokemonList;
};

const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) console.warn("Error fetching data from PokeAPI (fetchPokemonDetails)");

  const data = await response.json();

  return data as Pokemon;
};

export { fetchPokemon, fetchPokemonDetails };
