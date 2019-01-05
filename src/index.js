"use strict";

import App from "./App";
import config from "./data/config";
import users from "./data/users";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import "./css/index.css";

OfflinePluginRuntime.install();

window.app = new App(config, users, document.querySelector("#app"));
setTimeout(_ => app.start(), 500);