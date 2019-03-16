import React from "react";
import MatchFinalEntry from "./MatchFinalEntry.react";
import Match from "../../../../store/round/match/Match";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../../util/test";

describe("MatchFinalEntry Component.", () => {
  const match: Match = createDummyMatch();
  describe("Current And Actual Match.", () => {
    it("Matches snapshot.", () => {
      const component: ReactTestRenderer = create(
        <MatchFinalEntry
          match={match}
          className="foobar"
          isCurrentMatch={true}
          isActualMatch={true}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Not Current But Actual Match.", () => {
    it("Matches snapshot.", () => {
      const component: ReactTestRenderer = create(
        <MatchFinalEntry
          match={match}
          className="foobar"
          isCurrentMatch={false}
          isActualMatch={true}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Current But Not Actual Match.", () => {
    it("Matches snapshot.", () => {
      const component: ReactTestRenderer = create(
        <MatchFinalEntry
          match={match}
          className="foobar"
          isCurrentMatch={true}
          isActualMatch={false}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Not Current Nor Actual Match.", () => {
    it("Matches snapshot.", () => {
      const component: ReactTestRenderer = create(
        <MatchFinalEntry
          match={match}
          className="foobar"
          isCurrentMatch={false}
          isActualMatch={false}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
