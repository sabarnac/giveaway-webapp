import React from "react";
import LoserOverlay from "./LoserOverlay";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig, createDummyParticipant } from "../../util/test";
import Config from "../../store/config/Config";
import Participant from "../../store/round/match/participant/Participant";

describe("LoserOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const participants: Participant[] = [
      createDummyParticipant(1),
      createDummyParticipant(2),
      createDummyParticipant(3),
      createDummyParticipant(4)
    ];
    const component: ReactTestRenderer = create(
      <LoserOverlay
        config={config}
        losers={participants}
        onOverlayComplete={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
