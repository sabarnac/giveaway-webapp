import React from "react";
import LoserOverlay from "./LoserOverlay.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../util/test";
import Participant from "../../store/round/match/participant/Participant";

describe("LoserOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const participants: Participant[] = [
      createDummyParticipant(1),
      createDummyParticipant(2),
      createDummyParticipant(3),
      createDummyParticipant(4),
    ];
    const component: ReactTestRenderer = create(
      <LoserOverlay losers={participants} onOverlayComplete={() => {}} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
