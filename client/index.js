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

(async () => {
  if (!('fetch' in window)) {
    console.log('Loading fetch polyfill...');
    await import("./polyfills/fetch");
  }

  if (!('AbortController' in window)) {
    console.log('Loading AbortController polyfill...');
    await import("./polyfills/abortController");
  }

  renderer((
    <Router>
      <AppContextProvider>
        <App/>
      </AppContextProvider>
    </Router>
  ), root);
})();
