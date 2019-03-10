import React from "react";
import RoundMatchListView from "./RoundMatchListView";
import Round from "../../../store/round/Round";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyRound } from "../../../util/test";

describe("RoundMatchListView Component.", () => {
  it("Roundes snapshot.", () => {
    const round: Round = createDummyRound();
    const component: ReactTestRenderer = create(
      <RoundMatchListView
        className="foobar"
        round={round}
        matchId={round.firstMatch.id}
        onListComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
