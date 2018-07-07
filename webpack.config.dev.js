"use strict";

const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    module: {
        rules: []
    },
    resolve: {},
    devtool: "source-map",
    plugins: [],
    watchOptions: {
        poll: true
    }
};