import React from "react";

import "./App.css";



import { GlobalStyle } from "./GlobalStyled";
import { Router } from "./router/router";






function App() {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default App