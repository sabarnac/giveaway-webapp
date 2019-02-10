import React from "react";
import App from "./App";
import Tournament from "./store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament } from "./util/test";
import { Router } from "react-router-dom";
import { History, createBrowserHistory } from "history";

describe("TournamentView Component.", () => {
  describe("No Path.", () => {
    it("Matches snapshot.", () => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push("");
      const component: ReactTestRenderer = create(
        <Router history={history}>
          <App tournament={tournament} />
        </Router>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe("Partial Path.", () => {
    it("Matches snapshot.", () => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(`/?roundId=${tournament.lastRound.id}`);
      const component: ReactTestRenderer = create(
        <Router history={history}>
          <App tournament={tournament} />
        </Router>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe("Full Path.", () => {
    it("Matches snapshot.", () => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(
        `/?roundId=${tournament.lastRound.id}&matchId=${
          tournament.lastRound.lastMatch.id
        }`
      );
      const component: ReactTestRenderer = create(
        <Router history={history}>
          <App tournament={tournament} />
        </Router>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
