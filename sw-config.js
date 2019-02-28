module.exports = {
  runtimeCaching: [
    {
      urlPattern: "/giveaway-webapp/docs",
      handler: "networkFirst",
    },
    {
      urlPattern: "/giveaway-webapp/docs/",
      handler: "networkFirst",
    },
  ],
  replacePrefix: "/giveaway-webapp",
  skipWaiting: true,
};
