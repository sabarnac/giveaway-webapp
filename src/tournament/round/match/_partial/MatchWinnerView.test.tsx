import React from "react";
import MatchWinnerView from "./MatchWinnerView";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../../../util/test";
import Participant from "../../../../store/round/match/participant/Participant";

describe("MatchWinnerView Component.", () => {
  describe("Current Match.", () => {
    it("Matches snapshot.", () => {
      const winner: Participant = createDummyParticipant();
      const component: ReactTestRenderer = create(
        <MatchWinnerView
          winner={winner}
          className="foobar"
          isCurrentMatch={true}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe("Not Current Match.", () => {
    it("Matches snapshot.", () => {
      const winner: Participant = createDummyParticipant();
      const component: ReactTestRenderer = create(
        <MatchWinnerView
          winner={winner}
          className="foobar"
          isCurrentMatch={false}
        />,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
