import React from "react";
import LanguageControl from "./LanguageControl";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("LanguageControl Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<LanguageControl />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
