import React from "react";
import createParticipantView from ".";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../../util/test/";
import Participant from "../../../../../store/round/match/participant/Participant";

describe("ParticipantNameView Component.", () => {
  const ParticipantCustomView: Function = createParticipantView("foobar");

  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant();
    const component: ReactTestRenderer = create(
      <ParticipantCustomView participant={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
