import { fetch } from "expo/fetch";

interface Parameter {
  key: string;
  value: string;
}

const fetchPokemon = async (parameters: Parameter[] = [], path: string = "") => {
  const queryParams = parameters.length ? "?" + parameters.map((param) => `${param.key}=${param.value}`).join("&") : "";

  const url = `https://pokeapi.co/api/v2/pokemon${path}${queryParams}`;

  const response = await fetch(url);

  if (!response.ok) console.warn("Error fetching data from PokeAPI");

  return response.json();
};

export { fetchPokemon };
