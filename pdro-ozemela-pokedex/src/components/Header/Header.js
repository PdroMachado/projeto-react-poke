import React from "react";
import { ButtonPokedex, ContainerHeader, LogoStyle } from "./headerStyled";
import Logo from "./Logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let buttonLabel, handleClick;
  if (location.pathname === "/list/pokedex") {
    buttonLabel = "Home";
    handleClick = () => navigate("/");
  } else if (location.pathname.includes("/list/detail")) {
    buttonLabel = "Home";
    handleClick = () => navigate("/");
  } else {
    buttonLabel = "Pokédex";
    handleClick = () => navigate("/list/pokedex");
  }
  return (
    <ContainerHeader>
      <LogoStyle src={Logo}></LogoStyle>
      <ButtonPokedex onClick={handleClick}>{buttonLabel}</ButtonPokedex>
    </ContainerHeader>
  );
};

export default Header;
