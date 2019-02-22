import React from "react";
import MatchOverlay from "./MatchOverlay";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig, createDummyMatch } from "../../../../util/test";
import Config from "../../../../store/config/Config";

describe("MatchOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const component: ReactTestRenderer = create(
      <MatchOverlay
        config={config}
        currentMatch={createDummyMatch()}
        onMatchComplete={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
