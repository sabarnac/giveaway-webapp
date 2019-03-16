import React from "react";
import RoundMatchListView from "./RoundMatchListView.react";
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
        onCurrentMatchComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
