import React from "react";
import SpeedControl from "./SpeedControl";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig } from "../../util/test";
import Config from "../../store/config/Config";

describe("SpeedControl Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const component: ReactTestRenderer = create(
      <SpeedControl config={config} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
