import React from "react";
import WinnerOverlayWrapper from "./WinnerOverlayWrapper";
import { create, ReactTestRenderer } from "react-test-renderer";
import Participant from "../../../store/round/match/participant/Participant";
import { createDummyParticipant, createDummyConfig } from "../../../util/test";
import Config from "../../../store/config/Config";

describe("WinnerOverlayWrapper Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const participant: Participant = createDummyParticipant(0);
    const component: ReactTestRenderer = create(
      <WinnerOverlayWrapper config={config} winner={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
