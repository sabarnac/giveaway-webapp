import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import TournamentApp from "./TournamentView";
import * as serviceWorker from "./serviceWorker";
import Tournament from "./Store/Tournament";
import Config from "./Store/Config/Config";

const store = new Tournament(Config.instance);

ReactDOM.render(
  <TournamentApp tournament={store} />,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
