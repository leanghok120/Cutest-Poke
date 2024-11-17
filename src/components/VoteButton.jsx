import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import db from "../appwrite/databases";
import { Query } from "appwrite";

export default function VoteButton({ pokemon, fetchTwoPokemons }) {
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    setLoading(true);

    try {
      const response = await db.pokemons.list([
        Query.equal("name", pokemon.name),
      ]);

      if (response.documents.length > 0) {
        // Pokemon exists in db, update vote count
        const pokemonDoc = response.documents[0];
        const updatedVotes = pokemonDoc.votes;

        await db.pokemons.update(pokemonDoc.$id, { votes: updatedVotes });
      } else {
        // Pokemon does not exist in db
        await db.pokemons.create({
          name: pokemon.name,
          votes: 1,
          image: pokemon.sprites.front_default,
        });
      }

      fetchTwoPokemons();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="w-20 bg-gruvbox-aqua text-gruvbox-bg p-2 rounded-xl font-bold text-lg transition-all hover:scale-125 active:scale-110"
      onClick={handleVote}
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <Loader2 className="animate-spin text-white" size={20} /> // Show spinner when loading
      ) : (
        "Vote"
      )}
    </button>
  );
}
