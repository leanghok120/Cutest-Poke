import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}
