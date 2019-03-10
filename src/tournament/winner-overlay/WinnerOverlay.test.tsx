import React from "react";
import WinnerOverlay from "./WinnerOverlay";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyParticipant } from "../../util/test";

describe("WinnerOverlay Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <WinnerOverlay show={true} winner={createDummyParticipant(1)} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
