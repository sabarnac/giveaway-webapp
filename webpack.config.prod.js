"use strict";

const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "dist/index.js"
    },
    module: {
        rules: []
    },
    resolve: {},
    devtool: "source-map",
    plugins: []
};