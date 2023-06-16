import { useEffect, useState } from "react";
import pokeball from "../../assets/pokebola.png";
import { getTypes } from "../../utils/getTypes";
import { getColors } from "../../utils/getColors";

import {
  CatchButton,
  Container,
  Containerimg,
  DetailsLink,
  Pokeball,
  Pokemon,
  PokemonName,
  PokemonNumber,
  TypesContainer,
} from "./pokemonsStyled";

import { Displaynone } from "../../pages/Pokelist/pokelistStyled";
import { Details } from "../../pages/Details/DetailsPoke";
import { PokeballD } from "../../pages/Details/detailsStyled"

export const PokemonCard = ({ pokemons, onRemove, onCapturemsg }) => {
  const [captured, setCaptured] = useState(false);
  const types = pokemons.types.map((type) => getTypes(type.type.name));
  const color = pokemons.types.map((typecolor) =>
    getColors(typecolor.type.name)
  );

  useEffect(() => {
    const capturedPokemons =
      JSON.parse(localStorage.getItem("capturedPokemons")) || {};
    if (capturedPokemons[pokemons.id]) {
      setCaptured(true);
    }
  }, [pokemons.id]);

  const capturePokemon = () => {
    setCaptured(true);
    const capturedPokemons =
      JSON.parse(localStorage.getItem("capturedPokemons")) || {};
    capturedPokemons[pokemons.id] = pokemons;
    localStorage.setItem("capturedPokemons", JSON.stringify(capturedPokemons));
    onCapturemsg();
  };

  const releasePokemon = () => {
    setCaptured(false);
    const capturedPokemons =
      JSON.parse(localStorage.getItem("capturedPokemons")) || {};
    delete capturedPokemons[pokemons.id];
    localStorage.setItem("capturedPokemons", JSON.stringify(capturedPokemons));
    onRemove(pokemons.id);
  };

  return (
    <Container color={color}>
      <Containerimg>
        <Pokemon src={pokemons.sprites.front_default} alt="" />
        {onRemove && (
          <CatchButton onClick={releasePokemon}>To remove</CatchButton>
        )}
        {!onRemove && (
          <CatchButton onClick={capturePokemon} disabled={captured}>
            {captured ? "Captured" : "Capture"}
          </CatchButton>
        )}
      </Containerimg>
      <div>
        <PokemonNumber>#{pokemons.id}</PokemonNumber>
        <PokemonName>{pokemons.name}</PokemonName>
        <TypesContainer>
          {types.map((typeUrl) => (
            <img src={typeUrl} alt="" key={typeUrl} />
          ))}
        </TypesContainer>
        <DetailsLink href={`/list/detail/${pokemons.id}`}>Details</DetailsLink>
      </div>
      <PokeballD src={pokeball} alt="pokeball" />
      <Displaynone>
        <Details pokemons={pokemons} color={color} type={types} />
      </Displaynone>
    </Container>
  );
};