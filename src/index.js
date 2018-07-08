"use strict";

import App from "./App";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

const handle_json_response = response => response.json();

Promise.all([
    fetch("./config.json").then(handle_json_response),
    fetch("./users.json").then(handle_json_response)
]).then(([config, users]) => {
    window.app = new App(config, users, document.querySelector("#app"));
    setTimeout(_ => app.start(), 500);
});