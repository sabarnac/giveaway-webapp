import React from "react";
import LoserInfo from "./LoserInfo";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../util/test";
import Participant from "../../../store/round/match/participant/Participant";

describe("LoserInfo Component.", () => {
  it("Matches snapshot.", () => {
    const loser: Participant = createDummyParticipant(1);
    const component: ReactTestRenderer = create(
      <LoserInfo
        className="foobar"
        loser={loser}
        show={true}
        onInfoComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
