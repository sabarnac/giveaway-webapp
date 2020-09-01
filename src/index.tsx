import "./i18n"
import "./index.scss"
import "skeleton-css/css/skeleton.css"

import { Provider } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"

import AppRouter from "./AppRouter"
import * as serviceWorker from "./serviceWorker"
import Config from "./store/config/Config"
import ServiceWorkerAlertsConfig from "./store/config/ServiceWorkerAlertsConfig"
import Tournament from "./store/Tournament"

const config: Config = Config.getInstance();
const serviceWorkerAlertsConfig: ServiceWorkerAlertsConfig = ServiceWorkerAlertsConfig.getInstance();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => serviceWorkerAlertsConfig.setIsAdded(true),
  onUpdate: () => serviceWorkerAlertsConfig.setIsUpdated(true),
});
// serviceWorker.unregister();

// Create the tournament store
const store: Tournament = new Tournament(config);

// Set the webpage title.
document.title = `${config.name} Tournament`;

// Render the application! :D
ReactDOM.render(
  <HashRouter>
    <Provider
      config={config}
      serviceWorkerAlertsConfig={serviceWorkerAlertsConfig}
    >
      <AppRouter tournament={store} />
    </Provider>
  </HashRouter>,
  document.getElementById("root"),
);
