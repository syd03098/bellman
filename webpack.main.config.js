const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: "./src/main/index.ts",
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : undefined,
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src/main/"),
        exclude: /node_modules/,
      },
    ],
  },
  stats: "minimal",
};
