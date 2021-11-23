const webpack = require("webpack");
const path = require("path");
const { execFile } = require("child_process");
const config = require("./webpack.main.config");

const isWindows = process.platform === "win32";
const fileName = isWindows ? "electron.cmd" : "electron";

const compiler = webpack(config);

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
