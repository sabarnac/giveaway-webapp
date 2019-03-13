import React, { useState, useEffect } from "react";
import { pure } from "recompose";
import { inject } from "mobx-react";
import { WithTranslation, withTranslation } from "react-i18next";
import ServiceWorkerAlertsConfig from "../store/config/ServiceWorkerAlertsConfig";
const SweetAlert = require("sweetalert2-react");

/**
 * Properties of the service worker update alert React component.
 */
interface ServiceWorkerUpdateAlertProps {
  /** @ignore The service worker alerts config. */
  serviceWorkerAlertsConfig?: ServiceWorkerAlertsConfig;
}

/**
 * React component for the service worker update alert.
 */
export default withTranslation()(
  inject("serviceWorkerAlertsConfig")(
    pure(
      (props: ServiceWorkerUpdateAlertProps & WithTranslation): JSX.Element => {
        const [show, setShow] = useState(true);

        const title: string = props.t("serviceWorker.updateMessage.title");
        const message: string = props.t("serviceWorker.updateMessage.message");

        useEffect(() => {
          console.log(props);
        });

        return (
          <SweetAlert.default
            show={show && props.serviceWorkerAlertsConfig!.updated}
            type="warning"
            title={title}
            text={message}
            onConfirm={() => {
              setShow(false);
              props.serviceWorkerAlertsConfig!.setIsUpdated(false);
            }}
          />
        );
      },
    ),
  ),
);