/* craco.config.js */
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@engine": path.resolve(__dirname, "src/gameEngine"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@socket": path.resolve(__dirname, "src/socket"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "./public/favicon.ico", to: "" },
          { from: "./public/manifest.json", to: "" },
          { from: "./public/images/logo.png", to: "" },
          { from: "./public/images/logo-512.png", to: "" },
        ],
      }),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./src/src-sw.js",
        swDest: "sw.js"
      }),
    ]
  },
};
