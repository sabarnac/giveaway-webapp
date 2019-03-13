import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Tournament from "./store/Tournament";
import Config from "./store/config/Config";
import { HashRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { Provider } from "mobx-react";
import "skeleton-css/css/skeleton.css";
import "./i18n";
import ServiceWorkerAlertsConfig from "./store/config/ServiceWorkerAlertsConfig";

const config: Config = Config.getInstance();
const serviceWorkerAlertsConfig: ServiceWorkerAlertsConfig = ServiceWorkerAlertsConfig.getInstance();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => serviceWorkerAlertsConfig.setIsAdded(true),
  onUpdate: () => serviceWorkerAlertsConfig.setIsUpdated(true),
});

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
