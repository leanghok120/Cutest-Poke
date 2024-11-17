import React, { useEffect, useState } from "react";

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
    <div className="flex justify-center items-center gap-10 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={firstPokemon.sprites.front_default}
          alt={firstPokemon.name}
          className="w-52"
        />
        <h2 className="text-2xl font-bold mb-2">{firstPokemon.name}</h2>
        <button className="w-20 bg-gruvbox-aqua p-2 rounded-xl font-bold text-lg transition-all hover:scale-125 active:scale-110">
          Vote
        </button>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={secondPokemon.sprites.front_default}
          alt={secondPokemon.name}
          className="w-52"
        />
        <h2 className="text-2xl font-bold mb-2">{secondPokemon.name}</h2>
        <button className="w-20 bg-gruvbox-aqua p-2 rounded-xl font-bold text-lg transition-all hover:scale-125 active:scale-110">
          Vote
        </button>
      </div>
    </div>
  );
}
