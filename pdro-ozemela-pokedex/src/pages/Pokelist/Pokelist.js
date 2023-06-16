import { useEffect, useState, useRef } from "react";
import { getColors } from "../../utils/getColors";
import { getTypes } from "../../utils/getTypes";

import axios from "axios";
import { PokemonCard } from "../../components/cardPoke/CardPokemons";
import { ContainerMsg, Containerlist, Displaynone } from "./pokelistStyled";
import { Details } from "../Details/DetailsPoke";
import Header from "../../components/Header/Header";

export const List = (props) => {
  const cardColor = getColors;
  const pokeType = getTypes;
  const [pokemons, setPokemons] = useState([]);
  const [showCaptureMessage, setShowCaptureMessage] = useState(false);
  const captureMessageRef = useRef(null);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        captureMessageRef.current &&
        !captureMessageRef.current.contains(event.target)
      ) {
        setShowCaptureMessage(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCaptureMensagePokemon = () => {
    setShowCaptureMessage(true);
  };

  const getPokemons = () => {
    const endpoints = [];
    for (let i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((responses) => {
        const pokemonsData = responses.map((response) => response.data);
        setPokemons(pokemonsData);
      });
  };

  return (
    <div>
      <Header />
      <Containerlist>
        {showCaptureMessage && (
          <ContainerMsg ref={captureMessageRef}>
            <h1>Gotcha!</h1>
            <h3>The Pokémon has been added to your Pokédex</h3>
          </ContainerMsg>
        )}
        {pokemons.length ? (
          pokemons.map((pokemons) => {
            return (
              <PokemonCard
                pokemons={pokemons}
                cardColor={cardColor}
                getTypes={pokeType}
                onCapturemsg={handleCaptureMensagePokemon}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </Containerlist>
      <Displaynone>
        <Details
          pokemons={pokemons}
          cardColor={cardColor}
          getTypes={pokeType}
        />
      </Displaynone>
    </div>
  );
};
