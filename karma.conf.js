module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "chai"],
    //files: ["test/**/*.js"],
    // files: [{ pattern: "test/**/*.js", type: "module" }],
    files: [
      { pattern: "test/**/*.js", type: "module" },
      {
        pattern: "client/scripts/*.js",
        type: "module",
        watched: true,
        included: true,
        served: true,
      },
      // {
      //   pattern: "server/*.js",
      //   watched: true,
      //   included: true,
      //   served: true,
      // },
    ],
    proxies: {
      "/images/": "static/images/",
      // "/chai/": "node_modules/chai/",
      // "/chai-http/": "node_modules/chai-http/",
      "/server/": "server/",
    },
    reporters: ["progress"],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  });
};
