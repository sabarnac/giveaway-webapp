import React from "react";
import AppDevTools from "./AppDevTools";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("AppDevTools Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<AppDevTools />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
