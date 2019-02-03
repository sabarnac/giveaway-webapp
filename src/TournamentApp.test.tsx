import React from "react";
import ReactDOM from "react-dom";
import TournamentApp from "./TournamentApp";
import Tournament from "./store/Tournament";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = new Tournament();
  ReactDOM.render(<TournamentApp tournament={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
