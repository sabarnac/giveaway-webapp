import React from "react";
import WinnerOverlayView from "./WinnerOverlayView";
import { create, ReactTestRenderer } from "react-test-renderer";
import Participant from "../../../store/round/match/participant/Participant";
import { createDummyParticipant } from "../../../util/test";

describe("WinnerOverlayView Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant(0);
    const component: ReactTestRenderer = create(
      <WinnerOverlayView winner={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
