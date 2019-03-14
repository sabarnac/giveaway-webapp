import React from "react";
import TournamentView from "./TournamentView";
import Tournament from "../store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament } from "../util/test";

describe("TournamentView Component.", () => {
  it("Matches snapshot.", () => {
    const tournament: Tournament = createDummyTournament();
    const component: ReactTestRenderer = create(
      <TournamentView
        tournament={tournament}
        roundId={tournament.firstRound.id}
        matchId={tournament.firstRound.firstMatch.id}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
