import React from "react";
import MatchOverlay from "./MatchOverlay.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyMatch } from "../../../../util/test";

describe("MatchOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <MatchOverlay
        show={true}
        currentMatch={createDummyMatch()}
        onOverlayComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
