import React from "react";
import MatchOverlayParticipants from "./MatchOverlayParticipants";
import { create, ReactTestRenderer } from "react-test-renderer";
import Match from "../../../../../store/round/match/Match";
import { createDummyMatch } from "../../../../../util/test";

describe("MatchOverlayParticipants Component.", () => {
  it("Matches snapshot.", () => {
    const match: Match = createDummyMatch();
    const component: ReactTestRenderer = create(
      <MatchOverlayParticipants className="foobar" currentMatch={match} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
