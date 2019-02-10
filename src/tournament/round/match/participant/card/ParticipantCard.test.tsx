import React from "react";
import ParticipantCard from "./ParticipantCard";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../../util/test/index";
import Participant from "../../../../../store/round/match/participant/Participant";

describe("ParticipantCard Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant();
    const component: ReactTestRenderer = create(
      <ParticipantCard participant={participant} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
