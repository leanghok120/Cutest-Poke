import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import db from "../appwrite/databases";
import { Query } from "appwrite";

export default function Leaderboard() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    const response = await db.pokemons.list([
      Query.orderDesc("votes"),
      Query.limit(5),
    ]);

    setPokemons(response.documents);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gruvbox-bg text-gruvbox-fg">
      <Header />
      <h1 className="text-4xl font-black text-center mb-8">Leaderboard</h1>
      <div className="w-full max-w-2xl">
        <table className="table-auto w-full border-collapse border border-gruvbox-fg">
          <thead>
            <tr className="bg-gruvbox-highlight text-gruvbox-fg">
              <th className="border border-gruvbox-fg px-4 py-2">#</th>
              <th className="border border-gruvbox-fg px-4 py-2">Name</th>
              <th className="border border-gruvbox-fg px-4 py-2">Image</th>
              <th className="border border-gruvbox-fg px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon, index) => (
              <tr key={pokemon.$id}>
                <td className="border border-gruvbox-fg px-4 py-2 font-bold">
                  {index + 1}
                </td>
                <td className="border border-gruvbox-fg px-4 py-2 font-bold">
                  {pokemon.name}
                </td>
                <td className="border border-gruvbox-fg px-4 py-2 font-bold">
                  <img src={pokemon.image} alt={pokemon.name} />
                </td>
                <td className="border border-gruvbox-fg px-4 py-2 font-bold">
                  {pokemon.votes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
