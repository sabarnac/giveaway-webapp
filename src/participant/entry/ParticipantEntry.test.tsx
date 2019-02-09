import React from "react";
import ParticipantEntry from "./ParticipantEntry";
import Participant, {
  Avatar
} from "../../store/round/match/participant/Participant";
import renderer from "react-test-renderer";

describe("ParticipantEntry Component.", () => {
  it("Matches snapshot.", () => {
    const avatar = new Avatar("foobar", "barfoo");
    const participant = new Participant("fozbaz", avatar);
    const component = renderer.create(
      <ParticipantEntry participant={participant} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
