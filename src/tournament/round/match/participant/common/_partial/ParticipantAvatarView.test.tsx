import React from "react";
import ParticipantAvatarView from "./ParticipantAvatarView.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../../../util/test/index";
import Participant from "../../../../../../store/round/match/participant/Participant";

describe("ParticipantAvatarView Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant();
    const component: ReactTestRenderer = create(
      <ParticipantAvatarView className="foobar" participant={participant} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
