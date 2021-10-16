const webpack = require("webpack");
const path = require("path");
const { execFile } = require("child_process");

const isWindows = process.platform === "win32";
const fileName = isWindows ? "electron.cmd" : "electron";

const compiler = webpack({
  target: "electron-main",

  node: {
    __dirname: false,
    __filename: false,
  },

  entry: "./src/main/index.ts",
  mode: "development",
  devtool: "source-map",
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
});

let childProcess = null;

compiler.watch({}, (err, stats) => {
  if (err != null) {
    console.error(err);
  }
  if (stats !== null) {
    console.log(stats.toString({ colors: true }));
  }

  if (childProcess !== null) {
    childProcess.kill("SIGINT");
  }

  childProcess = execFile(
    path.resolve(__dirname, `./node_modules/.bin/${fileName}`),
    [path.resolve(__dirname, "./dist/index.js")]
  );
});
