import React from "react";
import ServiceWorkerUpdateAlert from "./ServiceWorkerUpdateAlert.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import {
  createDummyTranslationProps,
  createDummyServiceWorkerConfig,
} from "../util/test";

describe("ServiceWorkerUpdateAlert Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <ServiceWorkerUpdateAlert
        serviceWorkerAlertsConfig={createDummyServiceWorkerConfig()}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
