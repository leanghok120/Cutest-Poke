import React from "react";
import db from "../appwrite/databases";
import { Query } from "appwrite";

export default function VoteButton({ pokemon }) {
  async function handleVote() {
    try {
      const response = await db.pokemons.list([
        Query.equal("name", pokemon.name),
      ]);

      if (response.documents.length > 0) {
        // Pokemon exists in db, update vote count
        const pokemonDoc = response.documents[0];
        const updatedVotes = pokemonDoc.votes + 1;

        await db.pokemons.update(pokemonDoc.$id, { votes: updatedVotes });
      } else {
        // Pokemon does not exist in db
        await db.pokemons.create({
          name: pokemon.name,
          votes: 1,
          image: pokemon.sprites.front_default,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      className="w-20 bg-gruvbox-aqua text-gruvbox-bg p-2 rounded-xl font-bold text-lg transition-all hover:scale-125 active:scale-110"
      onClick={handleVote}
    >
      Vote
    </button>
  );
}
