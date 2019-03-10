import React from "react";
import LoserOverlayView from "./LoserOverlayView";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyRound } from "../../util/test";
import Round from "../../store/round/Round";

describe("LoserOverlayView Component.", () => {
  it("Matches snapshot.", () => {
    const round: Round = createDummyRound();
    const component: ReactTestRenderer = create(
      <LoserOverlayView
        round={round}
        show={true}
        onOverlayComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
