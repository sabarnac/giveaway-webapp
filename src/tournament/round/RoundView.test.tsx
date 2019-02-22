import React from "react";
import RoundView from "./RoundView";
import Round from "../../store/round/Round";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyRound } from "../../util/test";

describe("RoundView Component.", () => {
  it("Roundes snapshot.", () => {
    const round: Round = createDummyRound();
    const component: ReactTestRenderer = create(
      <RoundView
        round={round}
        matchId={round.firstMatch.id}
        onRoundComplete={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
