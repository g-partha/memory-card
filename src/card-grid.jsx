import { useState, useEffect } from "react";
import Card from "./card";

export default function CardGrid() {
  const [cardNumbers, setCardNumbers] = useState(10);
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    async function fetchPokemonList() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${cardNumbers}`
      );
      const result = await response.json();
      const arrayOfPromises = result.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonResult = await pokemonResponse.json();
        const pokemonSprite = pokemonResult.sprites.front_default;
        return { name: pokemon.name, sprite: pokemonSprite };
      });
      Promise.all(arrayOfPromises).then((results) => {
        setPokemonList(results);
      });
    }
    fetchPokemonList();
  }, [cardNumbers]);
  console.log(pokemonList);
}
