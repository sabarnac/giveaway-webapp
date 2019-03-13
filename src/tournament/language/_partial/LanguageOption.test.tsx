import React from "react";
import LanguageOption from "./LanguageOption";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("LanguageOption Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <LanguageOption language="en" />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
