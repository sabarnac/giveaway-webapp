import React from "react";
import MatchView from "./MatchView.react";
import Match from "../../../store/round/match/Match";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../util/test";

describe("MatchView Component.", () => {
  describe("Current Match.", () => {
    it("Matches snapshot.", () => {
      const match: Match = createDummyMatch();
      const component: ReactTestRenderer = create(
        <MatchView
          match={match}
          onMatchComplete={() => {}}
          isCurrentMatch={true}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Not Current Match.", () => {
    it("Matches snapshot.", () => {
      const match: Match = createDummyMatch();
      const component: ReactTestRenderer = create(
        <MatchView
          match={match}
          onMatchComplete={() => {}}
          isCurrentMatch={false}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
