import React from "react";
import Header from "./components/Header";
import Pokemons from "./components/Pokemons";

export default function App() {
  return (
    <div className="h-screen bg-gruvbox-bg text-gruvbox-fg">
      <Header />
      <h1 className="text-4xl font-black mt-10 text-center">
        Which one is cuter?
      </h1>
      <Pokemons />
    </div>
  );
}
