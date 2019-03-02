import React from "react";
import MatchOverlay from "./MatchOverlay";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../../util/test";

describe("MatchOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <MatchOverlay
        currentMatch={createDummyMatch()}
        onMatchComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
