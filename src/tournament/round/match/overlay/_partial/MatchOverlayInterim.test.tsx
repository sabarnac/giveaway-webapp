import React from "react";
import MatchOverlayInterim from "./MatchOverlayInterim.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTranslationProps } from "../../../../../util/test";

describe("MatchOverlayInterim Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <MatchOverlayInterim
        show={true}
        className="foobar"
        onInterimComplete={() => {}}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
