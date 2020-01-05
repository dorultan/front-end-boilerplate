import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import {hydrate, render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.scss";
import AppContextProvider from "./context/AppContext";
import App from "./components/App";

const root = document.querySelector('#root-app');
const renderer = {hydrate, render}[root.hasChildNodes() ? 'hydrate' : 'render'];

renderer((
  <Router>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
  </Router>
), root);
