import { inject } from "mobx-react";
import { withTranslation } from "react-i18next";
import ServiceWorkerUpdateAlert from "./ServiceWorkerUpdateAlert.react";

/**
 * React component for the service worker add alert.
 */
export default withTranslation()(
  inject("serviceWorkerAlertsConfig")(ServiceWorkerUpdateAlert),
);
