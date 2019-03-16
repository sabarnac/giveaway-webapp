import React from "react";
import LanguageOption from "./LanguageOption.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig } from "../../../util/test";

describe("LanguageOption Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <LanguageOption
        className="foobar"
        config={createDummyConfig()}
        language="en"
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
