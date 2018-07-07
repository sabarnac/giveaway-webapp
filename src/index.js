import App from "./App"

const handle_json_response = response => response.json();

window.addEventListener("load", _ => {
    Promise.all([
        fetch("./config.json").then(handle_json_response),
        fetch("./users.json").then(handle_json_response)
    ]).then(([config, users]) => {
        window.app = new App(config, users, document.querySelector("#app"));
        setTimeout(_ => app.start(), 150);
    });
});