import React from "react";
import ServiceWorkerAddAlert from "./ServiceWorkerAddAlert";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("ServiceWorkerAddAlert Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<ServiceWorkerAddAlert />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
