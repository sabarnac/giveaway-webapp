import React from "react";
import LanguageControl from "./LanguageControl.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig } from "../../util/test";

describe("LanguageControl Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <LanguageControl config={createDummyConfig()} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
