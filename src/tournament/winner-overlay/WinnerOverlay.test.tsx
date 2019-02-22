import React from "react";
import WinnerOverlay from "./WinnerOverlay";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyConfig, createDummyParticipant } from "../../util/test";
import Config from "../../store/config/Config";

describe("WinnerOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const config: Config = createDummyConfig();
    const component: ReactTestRenderer = create(
      <WinnerOverlay config={config} winner={createDummyParticipant(1)} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
