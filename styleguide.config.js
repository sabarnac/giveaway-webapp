module.exports = {
  components: "src/**/*.{js,jsx,ts,tsx}",
  ignore: [
    "**/__tests__/**",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.d.ts",
    "src/store/config/RandomGenerator.ts",
    "src/util/**/*",
    "src/index.tsx",
    "src/setupTests.tsx",
    "src/serviceWorker.ts",
    "src/i18n.ts",
  ],
  propsParser: require("react-docgen-typescript").parse,
  styleguideDir: "build/docs",
  ribbon: {
    url: "https://github.com/sabarnac/giveaway-webapp/",
    text: "Fork me on GitHub",
  },
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.output = {
      ...webpackConfig.output,
      publicPath: process.env.PUBLIC_URL || "",
    };
    return webpackConfig;
  },
};
