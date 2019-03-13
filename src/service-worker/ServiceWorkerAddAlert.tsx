import React, { useState } from "react";
import { inject } from "mobx-react";
import { WithTranslation, withTranslation } from "react-i18next";
import ServiceWorkerAlertsConfig from "../store/config/ServiceWorkerAlertsConfig";
const SweetAlert = require("sweetalert2-react");

/**
 * Properties of the service worker add alert React component.
 */
interface ServiceWorkerAddAlertProps {
  /** @ignore The service worker alerts config. */
  serviceWorkerAlertsConfig?: ServiceWorkerAlertsConfig;
}

/**
 * React component for the service worker add alert.
 */
export default withTranslation()(
  inject("serviceWorkerAlertsConfig")(
    (props: ServiceWorkerAddAlertProps & WithTranslation): JSX.Element => {
      const [show, setShow] = useState(true);

      const title: string = props.t("serviceWorker.offlineMessage.title");
      const message: string = props.t("serviceWorker.offlineMessage.message");

      return (
        <SweetAlert.default
          show={show && props.serviceWorkerAlertsConfig!.added}
          title={title}
          text={message}
          onConfirm={() => setShow(false)}
        />
      );
    },
  ),
);
