import React from "react";
import MatchOverlayParticipants from "./MatchOverlayParticipants.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import Match from "../../../../../store/round/match/Match";
import {
  createDummyMatch,
  createDummyTranslationProps,
} from "../../../../../util/test";

describe("MatchOverlayParticipants Component.", () => {
  it("Matches snapshot.", () => {
    const match: Match = createDummyMatch();
    const component: ReactTestRenderer = create(
      <MatchOverlayParticipants
        className="foobar"
        currentMatch={match}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
