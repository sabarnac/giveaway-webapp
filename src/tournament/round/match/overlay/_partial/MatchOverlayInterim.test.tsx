import React from "react";
import MatchOverlayInterim from "./MatchOverlayInterim";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("MatchOverlayInterim Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <MatchOverlayInterim
        show={true}
        className="foobar"
        onInterimComplete={() => {}}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
