import React from "react";
import ParticipantCard from "./ParticipantCard";
import Participant, {
  Avatar
} from "../../store/round/match/participant/Participant";
import renderer from "react-test-renderer";

describe("ParticipantCard Component.", () => {
  it("Matches snapshot.", () => {
    const avatar = new Avatar("foobar", "barfoo");
    const participant = new Participant("fozbaz", avatar);
    const component = renderer.create(
      <ParticipantCard participant={participant} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
