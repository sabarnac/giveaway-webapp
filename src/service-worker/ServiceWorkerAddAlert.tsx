import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import ServiceWorkerAddAlert from "./ServiceWorkerAddAlert.react";

/**
 * React component for the service worker add alert.
 */
export default withTranslation()(
  inject("serviceWorkerAlertsConfig")(observer(ServiceWorkerAddAlert)),
);
