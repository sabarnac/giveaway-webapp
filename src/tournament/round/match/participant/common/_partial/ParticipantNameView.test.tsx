import React from "react";
import ParticipantNameView from "./ParticipantNameView.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../../../util/test/index";
import Participant from "../../../../../../store/round/match/participant/Participant";

describe("ParticipantNameView Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant();
    const component: ReactTestRenderer = create(
      <ParticipantNameView className="foobar" participant={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
