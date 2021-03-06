import React, { useState } from "react";
import { WithTranslation } from "react-i18next";
import ServiceWorkerAlertsConfig from "../store/config/ServiceWorkerAlertsConfig";
const SweetAlert = require("sweetalert2-react");

/**
 * Properties of the service worker add alert React component.
 */
export interface ServiceWorkerAddAlertProps extends WithTranslation {
  /** @ignore The service worker alerts config. */
  serviceWorkerAlertsConfig?: ServiceWorkerAlertsConfig;
}

/**
 * React component for the service worker add alert.
 */
export default (props: ServiceWorkerAddAlertProps): JSX.Element => {
  const [show, setShow] = useState(true);

  const title: string = props.t("serviceWorker.offlineMessage.title");
  const message: string = props.t("serviceWorker.offlineMessage.message");

  return (
    <SweetAlert.default
      show={show && props.serviceWorkerAlertsConfig!.added}
      type="success"
      title={title}
      text={message}
      onConfirm={() => {
        setShow(false);
        props.serviceWorkerAlertsConfig!.setIsAdded(false);
      }}
    />
  );
};
