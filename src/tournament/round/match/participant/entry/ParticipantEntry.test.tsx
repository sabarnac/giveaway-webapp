import React from "react";
import ParticipantEntry from "./ParticipantEntry";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../../util/test/index";
import Participant from "../../../../../store/round/match/participant/Participant";

describe("ParticipantEntry Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant();
    const component: ReactTestRenderer = create(
      <ParticipantEntry participant={participant} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
