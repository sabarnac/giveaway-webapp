import React from "react";
import ServiceWorkerAddAlert from "./ServiceWorkerAddAlert.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import {
  createDummyTranslationProps,
  createDummyServiceWorkerConfig,
} from "../util/test";

describe("ServiceWorkerAddAlert Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <ServiceWorkerAddAlert
        serviceWorkerAlertsConfig={createDummyServiceWorkerConfig()}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
