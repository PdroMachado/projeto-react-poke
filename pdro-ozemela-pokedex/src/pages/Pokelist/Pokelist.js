import { useEffect, useState, useRef } from "react";
import { getColors } from "../../utils/getColors";
import { getTypes } from "../../utils/getTypes";

import axios from "axios";
import { PokemonCard } from "../../components/cardPoke/CardPokemons";
import { ContainerMsg, Containerlist, Displaynone } from "./listStyled";
import { Details } from "../Details/DetailsPoke";
import Header from "../../components/Header/Header";
