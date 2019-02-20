module.exports = {
    components: "src/**/*.{js,jsx,ts,tsx}",
    ignore: ["**/__tests__/**", "**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "**/*.d.ts", "src/store/config/RandomGenerator.ts", "src/util/**/*", "src/index.tsx", "src/setupTests.tsx", "src/serviceWorker.ts"],
    propsParser: require("react-docgen-typescript").parse,
    styleguideDir: "build/docs",
    dangerouslyUpdateWebpackConfig(webpackConfig, env) {
        webpackConfig.output = {
            ...webpackConfig.output,
            publicPath: process.env.PUBLIC_URL || ''
        };
        return webpackConfig;
    }
};