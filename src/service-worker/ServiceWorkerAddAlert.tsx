import { inject } from "mobx-react";
import { withTranslation } from "react-i18next";
import ServiceWorkerAddAlert from "./ServiceWorkerAddAlert.react";
import { createObserver } from "../util";

/**
 * React component for the service worker add alert.
 */
export default withTranslation()(
  inject("serviceWorkerAlertsConfig")(createObserver(ServiceWorkerAddAlert)),
);
