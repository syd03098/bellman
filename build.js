const { build } = require("electron-builder");

build({
  config: {
    productName: "Bellman",
    files: ["dist/**/*"],
    directories: {
      output: "release",
    },
    mac: {
      target: {
        target: "default",
        arch: ["x64", "arm64"],
      },
    },
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
