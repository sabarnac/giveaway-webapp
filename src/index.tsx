import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Tournament from "./store/Tournament";
import Config from "./store/config/Config";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "mobx-react";

const store = new Tournament(Config.instance);

ReactDOM.render(
  <HashRouter>
    <Provider config={Config.instance}>
      <App tournament={store} />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
