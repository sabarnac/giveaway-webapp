import React from "react";
import MatchParticipantList from "./MatchParticipantList.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../../util/test";
import Match from "../../../../store/round/match/Match";

describe("MatchParticipantList Component.", () => {
  it("Roundes snapshot.", () => {
    const match: Match = createDummyMatch();
    const component: ReactTestRenderer = create(
      <MatchParticipantList className="foobar" match={match} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
