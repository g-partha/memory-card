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
      setPokemonList(result.results);
    }
    fetchPokemonList();
  }, []);
  console.log(pokemonList);
}
