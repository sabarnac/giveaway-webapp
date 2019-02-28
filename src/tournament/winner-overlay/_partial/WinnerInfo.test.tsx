import React from "react";
import WinnerInfo from "./WinnerInfo";
import { create, ReactTestRenderer } from "react-test-renderer";
import Participant from "../../../store/round/match/participant/Participant";
import { createDummyParticipant } from "../../../util/test";

describe("WinnerInfo Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant(0);
    const component: ReactTestRenderer = create(
      <WinnerInfo winner={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
