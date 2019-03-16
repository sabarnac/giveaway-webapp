import React from "react";
import LoserOverlayView from "./LoserOverlayView.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../util/test";
import Participant from "../../../store/round/match/participant/Participant";

describe("LoserOverlayView Component.", () => {
  it("Matches snapshot.", () => {
    const losers: Participant[] = [
      createDummyParticipant(1),
      createDummyParticipant(2),
      createDummyParticipant(3),
      createDummyParticipant(4),
    ];
    const component: ReactTestRenderer = create(
      <LoserOverlayView
        className="foobar"
        losers={losers}
        onViewComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
