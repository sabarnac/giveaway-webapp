import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TournamentApp from "./TournamentApp";
import * as serviceWorker from "./serviceWorker";
import Tournament from "./store/Tournament";

const store = new Tournament();

ReactDOM.render(
  <TournamentApp tournament={store} />,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
