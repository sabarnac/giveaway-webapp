import swal from "sweetalert";
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () =>
    swal({
      title: "Use Offline",
      text: "This web application can now be used offline!",
      icon: "success",
    }),
  onUpdate: () =>
    swal({
      title: "App Updated",
      text:
        "This web application has been updated. Please close all tabs/instances of it and open it again to see the update.",
      icon: "warning",
    }),
});

// Create the tournament store
const store: Tournament = new Tournament(Config.getInstance());

// Set the webpage title.
document.title = `${Config.getInstance().name} Tournament`;

// Render the application! :D
ReactDOM.render(
  <HashRouter>
    <Provider config={Config.getInstance()}>
      <AppRouter tournament={store} />
    </Provider>
  </HashRouter>,
  document.getElementById("root"),
);
