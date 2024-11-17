import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import VoteButton from "./VoteButton";

export default function Pokemons() {
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);

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
      // Fetch both Pokémon simultaneously using Promise.all
      const [firstPoke, secondPoke] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${firstId}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${secondId}`),
      ]);

      // Wait for both responses to be parsed as JSON
      const [firstData, secondData] = await Promise.all([
        firstPoke.json(),
        secondPoke.json(),
      ]);

      // Set the state with both Pokémon data
      setFirstPokemon(firstData);
      setSecondPokemon(secondData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  if (!firstPokemon || !secondPokemon) {
    return <Loader2 className="animate-spin text-gruvbox-aqua" size={50} />;
  }

  return (
    <div className="flex justify-center items-center gap-10 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={firstPokemon.sprites.front_default}
          alt={firstPokemon.name}
          className="w-52"
        />
        <h2 className="text-2xl font-bold mb-2">{firstPokemon.name}</h2>
        <VoteButton pokemon={firstPokemon} fetchTwoPokemons={fetchTwoPokemon} />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={secondPokemon.sprites.front_default}
          alt={secondPokemon.name}
          className="w-52"
        />
        <h2 className="text-2xl font-bold mb-2">{secondPokemon.name}</h2>
        <VoteButton
          pokemon={secondPokemon}
          fetchTwoPokemons={fetchTwoPokemon}
        />
      </div>
    </div>
  );
}
