import React, { useEffect, useState } from "react";

export default function Pokemons() {
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);

  // Get 2 random pokemon
  useEffect(() => {
    fetchTwoPokemon();
  }, []);

  function getRandomId() {
    return Math.floor(Math.random() * 1000 + 1);
  }

  async function fetchTwoPokemon() {
    const firstId = getRandomId();
    const secondId = getRandomId();

    try {
      const firstPoke = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${firstId}`,
      );
      const firstData = await firstPoke.json();
      setFirstPokemon(firstData);

      const secondPoke = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${secondId}`,
      );
      const secondData = await secondPoke.json();
      setSecondPokemon(secondData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  if (!firstPokemon || !secondPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Pokémon 1: {firstPokemon.name}</h2>
      <img src={firstPokemon.sprites.front_default} alt={firstPokemon.name} />
      <h2>Pokémon 2: {secondPokemon.name}</h2>
      <img src={secondPokemon.sprites.front_default} alt={secondPokemon.name} />
    </div>
  );
}
