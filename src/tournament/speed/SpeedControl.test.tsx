import React from "react";
import SpeedControl from "./SpeedControl.react";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("SpeedControl Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<SpeedControl />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
