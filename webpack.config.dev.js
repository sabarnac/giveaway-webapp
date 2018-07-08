"use strict";

const path = require("path");
const OfflinePlugin = require("offline-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.[hash].js",
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    resolve: {},
    devtool: "source-map",
    plugins: [
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: 'The Giveaway Tournment',
            short_name: 'G Tournament',
            description: 'A tournament style giveaway app.',
            background_color: '#000000',
            icons: [{
                    src: path.resolve('./src/img/icon.png'),
                    sizes: [96, 120, 152, 167, 180, 128, 192, 256, 384, 512],
                    ios: true
                },
                {
                    src: path.resolve('./src/img/large-icon.png'),
                    size: 1024,
                    ios: true
                }
            ],
            inject: false,
            fingerprint: false,
            ios: true

        }),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            minify: true,
            hash: true
        }),
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