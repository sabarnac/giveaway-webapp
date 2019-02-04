import React from "react";
import ReactDOM from "react-dom";
import TournamentView from "./TournamentView";
import Tournament from "./Store/Tournament";
import Config from "./Store/Config/Config";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = new Tournament(Config.instance);
  ReactDOM.render(<TournamentView tournament={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
