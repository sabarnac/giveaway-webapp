import React from "react";
import App from "./App";
import Tournament from "./store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament } from "./util/test";
import { Router } from "react-router-dom";
import { History, createBrowserHistory } from "history";

describe("TournamentView Component.", (): void => {
  describe("No Path.", (): void => {
    it("Matches snapshot.", (): void => {
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

  describe("Partial Path.", (): void => {
    it("Matches snapshot.", (): void => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(`/round/${tournament.lastRound.id}`);
      const component: ReactTestRenderer = create(
        <Router history={history}>
          <App tournament={tournament} />
        </Router>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe("Incorrect Partial Path.", (): void => {
    it("Matches snapshot.", (): void => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(`/round/${tournament.lastRound.id}-foo`);
      const component: ReactTestRenderer = create(
        <Router history={history}>
          <App tournament={tournament} />
        </Router>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe("Full Path.", (): void => {
    it("Matches snapshot.", (): void => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(
        `/round/${tournament.lastRound.id}/match/${
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

  describe("Incorrect Full Path.", (): void => {
    it("Matches snapshot.", (): void => {
      const tournament: Tournament = createDummyTournament();
      const history: History = createBrowserHistory();
      history.push(
        `/round/${tournament.lastRound.id}/match/${
          tournament.lastRound.lastMatch.id
        }-foo`
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
