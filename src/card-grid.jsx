import { useState, useEffect } from "react";
import Card from "./card";
import './styles/card-grid.css';

function shuffleArray(array) {
  const arrayCopy = [...array];
  for (let i = 0; i < arrayCopy.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}

export default function CardGrid({ score, highScore, setScore, setHighScore }) {
  const cardNumbers = 12;
  const [pokemonList, setPokemonList] = useState([]);

  function resetCards() {
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    const shuffledPokemonArray = shuffleArray(pokemonList);
    for (let i = 0; i < shuffledPokemonArray.length; i++) {
      shuffledPokemonArray[i].clicked = false;
    }
    setPokemonList(shuffledPokemonArray);
  }
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
        return { name: pokemon.name, sprite: pokemonSprite, clicked: false };
      });
      Promise.all(arrayOfPromises).then((results) => {
        const shuffledPokemonArray = shuffleArray(results);
        setPokemonList(shuffledPokemonArray);
      });
    }
    fetchPokemonList();
  }, [cardNumbers]);

  const handleClick = (pokemonName) => {
    return () => {
      const shuffledPokemonArray = shuffleArray(pokemonList);
      const found = shuffledPokemonArray.find(
        (pokemon) => pokemon.name === pokemonName
      );
      if (found.clicked === false) {
        found.clicked = true;
        setScore((score) => score + 1);
      } else if (found.clicked === true) {
        resetCards();
      }
      setPokemonList(shuffledPokemonArray);
    };
  };

  const pokemonCards = [];

  for (let i = 0; i < pokemonList.length; i++) {
    pokemonCards.push(
      <Card
        key={pokemonList[i].name}
        name={pokemonList[i].name}
        src={pokemonList[i].sprite}
        handleClick={handleClick(pokemonList[i].name)}
      />
    );
  }
  return <div className="card-grid">{pokemonCards}</div>;
}
