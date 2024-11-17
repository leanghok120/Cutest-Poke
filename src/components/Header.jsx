import React from "react";
import { Link } from "react-router-dom";
import { ChartColumnBig } from "lucide-react";

export default function Header() {
  return (
    <header>
      <Link
        className="absolute top-5 left-5 text-2xl font-bold transition-all hover:text-gruvbox-gray"
        to="/"
      >
        Cutest-Poke
      </Link>
      <Link
        className="absolute top-5 right-5 text-2xl font-bold transition-all hover:text-gruvbox-gray"
        to="/leaderboard"
      >
        <ChartColumnBig />
      </Link>
    </header>
  );
}
