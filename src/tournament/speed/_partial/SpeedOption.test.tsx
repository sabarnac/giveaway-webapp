import React from "react";
import SpeedOption from "./SpeedOption";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("SpeedOption Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<SpeedOption speed={1} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
