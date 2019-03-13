import React from "react";
import ServiceWorkerUpdateAlert from "./ServiceWorkerUpdateAlert";
import { create, ReactTestRenderer } from "react-test-renderer";

describe("ServiceWorkerUpdateAlert Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(<ServiceWorkerUpdateAlert />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
