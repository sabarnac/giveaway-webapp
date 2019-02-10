import React from "react";
import MatchView from "./MatchView";
import Match from "../../../store/round/match/Match";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../util/test";

describe("MatchView Component.", () => {
  describe("Current Match.", () => {
    it("Matches snapshot.", () => {
      const match: Match = createDummyMatch();
      const component: ReactTestRenderer = create(
        <MatchView match={match} isCurrentMatch={true} />
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Not Current Match.", () => {
    it("Matches snapshot.", () => {
      const match: Match = createDummyMatch();
      const component: ReactTestRenderer = create(
        <MatchView match={match} isCurrentMatch={false} />
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
