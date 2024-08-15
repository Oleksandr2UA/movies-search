import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename="/movies-search">
      <GlobalStyles />
      <App />
    </HashRouter>
  </React.StrictMode>
);
