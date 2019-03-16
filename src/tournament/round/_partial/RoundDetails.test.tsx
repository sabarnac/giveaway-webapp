import React from "react";
import RoundDetails from "./RoundDetails.react";
import Round from "../../../store/round/Round";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyRound } from "../../../util/test";

describe("RoundDetails Component.", () => {
  it("Roundes snapshot.", () => {
    const round: Round = createDummyRound();
    const component: ReactTestRenderer = create(
      <RoundDetails
        className="foobar"
        show={true}
        round={round}
        matchId={round.firstMatch.id}
        onCurrentComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
