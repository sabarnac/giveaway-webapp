import React from "react";
import MatchOverlayWinner from "./MatchOverlayWinner.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import Match from "../../../../../store/round/match/Match";
import {
  createDummyMatch,
  createDummyConfig,
  createDummyTranslationProps,
  createDummyRouterProps,
} from "../../../../../util/test";
import Config from "../../../../../store/config/Config";

describe("MatchOverlayWinner Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const match: Match = createDummyMatch();
    const component: ReactTestRenderer = create(
      <MatchOverlayWinner
        show={true}
        className="foobar"
        currentMatch={match}
        onWinnerComplete={() => {}}
        config={config}
        {...createDummyTranslationProps()}
        {...createDummyRouterProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
