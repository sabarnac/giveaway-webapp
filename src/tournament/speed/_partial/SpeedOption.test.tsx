import React from "react";
import SpeedOption from "./SpeedOption.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig } from "../../../util/test";

describe("SpeedOption Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <SpeedOption className="foobar" config={createDummyConfig()} speed={1} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
