"use strict";

const path = require("path");
const OfflinePlugin = require('offline-plugin');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/giveaway-webapp/",
        filename: "index.js",
    },
    module: {
        rules: []
    },
    resolve: {},
    devtool: "source-map",
    plugins: [
        new OfflinePlugin({
            appShell: "./index.html",
            externals: [
                "./index.html",
                "./config.json",
                "./users.json",
                "https://fonts.googleapis.com/css?family=Open+Sans:400,600"
            ],
            autoUpdate: true
        })
    ],
    watchOptions: {
        poll: true
    }
};