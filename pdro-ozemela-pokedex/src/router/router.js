import { BrowserRouter, Routes, Route } from "react-router-dom";


import { List } from "../pages/Pokelist/Pokelist";
import { Pokedex } from "../pages/Pokedex/Pokedex";
import { Details } from "../pages/Details/DetailsPoke";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list/pokedex" element={<Pokedex />} />

        <Route path="/list/detail/:id" element={<Details />} />

        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};