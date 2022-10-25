import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./core/global-styles";
import { Routes } from "./core/routes";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Routes />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));
