const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "electron-renderer",
  devtool: "inline-source-map",

  mode: "development",

  entry: {
    main: path.resolve(__dirname, "src/renderer/routes/index.tsx"),
    preload: path.resolve(__dirname, "src/renderer/routes/preload.ts"),
  },

  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      "@routes": path.resolve(__dirname, "./src/renderer/routes"),
      "@components": path.resolve(__dirname, "./src/renderer/components"),
      "@icons": path.resolve(__dirname, "./src/renderer/components/icons"),
      "@library": path.resolve(__dirname, "./src/renderer/library"),
      "@hooks": path.resolve(__dirname, "./src/renderer/hooks"),
      "@theme": path.resolve(__dirname, "./src/renderer/theme"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src/renderer/"),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/routes/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/public/"),
        },
      ],
    }),
  ],
};
