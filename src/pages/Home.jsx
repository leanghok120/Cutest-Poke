import React from "react";
import Header from "../components/Header";
import Pokemons from "../components/Pokemons";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gruvbox-bg text-gruvbox-fg">
      <Header />
      <h1 className="text-4xl font-black text-center">Which one is cuter?</h1>
      <Pokemons />
    </div>
  );
}
