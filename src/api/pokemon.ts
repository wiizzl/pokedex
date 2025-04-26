import type {
  Pokemon,
  PokemonAbilityDetails,
  PokemonDamageRelation,
  PokemonDetails,
  PokemonEvolutionChain,
  PokemonNames,
  PokemonSpecies,
} from "@/types/pokemon";

const BASE_ROUTE = "https://pokeapi.co/api/v2";

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchPokemonDetails = async (name: string) => {
  const divisor = 10;

  try {
    const data = await fetchData<PokemonDetails>(`${BASE_ROUTE}/pokemon/${name}`);

    return {
      pokemonStats: data.stats,
      pokemonId: data.id,
      height: data.height / divisor,
      weight: data.weight / divisor,
      primaryType: data.types[0].type.name,
      types: data.types,
      imageUrl: data.sprites.other.home.front_default,
      name,
    };
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
};

const fetchPokemonNames = async () => {
  try {
    const data = await fetchData<PokemonNames>(`${BASE_ROUTE}/pokemon/?limit=151`);

    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
    throw error;
  }
};

const fetchPokemonList = async (offset: number, limit: number) => {
  try {
    const data = await fetchData<PokemonNames>(`${BASE_ROUTE}/pokemon/?offset=${offset}&limit=${limit}`);

    const urls = data.results.map((pokemon: Pokemon) => pokemon.url);
    const promises = await Promise.all(urls.map((url: string) => fetchData<PokemonDetails>(url)));

    return promises;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

const fetchSearchedPokemon = async (name: string) => {
  try {
    const data = await fetchData<PokemonDetails>(`${BASE_ROUTE}/pokemon/${name}`);

    return {
      id: data.id,
      name,
      type: data.types[0].type.name,
      url: data.sprites.other.home.front_default,
    };
  } catch (error) {
    console.error(`Error searching for Pokémon ${name}:`, error);
    throw error;
  }
};

const fetchType = async (endpoint: string) => {
  try {
    const data = await fetchData<PokemonDamageRelation>(endpoint);

    const doubleDamageFrom = data.damage_relations.double_damage_from;
    const halfDamageFrom = data.damage_relations.half_damage_from;
    const noDamageFrom = data.damage_relations.no_damage_from;

    return [doubleDamageFrom, halfDamageFrom, noDamageFrom];
  } catch (error) {
    console.error("Error fetching type data:", error);
    return null;
  }
};

const fetchEvolutionChain = async (id: number) => {
  try {
    const speciesData = await fetchData<PokemonSpecies>(`${BASE_ROUTE}/pokemon-species/${id}`);
    const evolutionChainData = await fetchData<PokemonEvolutionChain>(speciesData.evolution_chain.url);

    const firstEvolution = evolutionChainData.chain.species.name;
    const secondEvolution = evolutionChainData.chain.evolves_to[0]?.species?.name;
    const thirdEvolution = evolutionChainData.chain.evolves_to[0]?.evolves_to[0]?.species?.name;

    const result = [firstEvolution];

    if (secondEvolution) result.push(secondEvolution);
    if (thirdEvolution) result.push(thirdEvolution);

    const promises = result.map(async (name) => {
      return await fetchPokemonDetails(name);
    });

    const pokemonData = await Promise.all(promises);

    return pokemonData.map((item) => {
      return { name: item?.name, url: item?.imageUrl };
    });
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
};

const fetchFlavorText = async (id: number) => {
  try {
    const speciesData = await fetchData<PokemonSpecies>(`${BASE_ROUTE}/pokemon-species/${id}`);
    const flavorTextEntries = speciesData.flavor_text_entries[1].flavor_text;

    return flavorTextEntries;
  } catch (error) {
    console.error("Error fetching flavor text:", error);
    throw error;
  }
};

const fetchAbilityDetails = async (url: string) => {
  try {
    const abilityDetails = await fetchData<PokemonAbilityDetails>(url);
    const effectEntry = abilityDetails.effect_entries.find((entry) => entry.language.name === "en");

    return {
      name: abilityDetails.name,
      effect: effectEntry?.effect,
    };
  } catch (error) {
    console.error("Error fetching ability effects:", error);
    throw error;
  }
};

const fetchAbilitiesWithEffects = async (name: string) => {
  try {
    const data = await fetchData<PokemonDetails>(`${BASE_ROUTE}/pokemon/${name}`);

    const abilitiesWithEffects = await Promise.all(
      data.abilities.map(async (ability) => {
        return await fetchAbilityDetails(ability.ability.url);
      })
    );

    return abilitiesWithEffects;
  } catch (error) {
    console.error("Error fetching ability details:", error);
    throw error;
  }
};

export {
  fetchAbilitiesWithEffects,
  fetchAbilityDetails,
  fetchEvolutionChain,
  fetchFlavorText,
  fetchPokemonDetails,
  fetchPokemonList,
  fetchPokemonNames,
  fetchSearchedPokemon,
  fetchType,
};
