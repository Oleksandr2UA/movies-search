import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="movies-search">
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
