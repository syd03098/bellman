const {
  build: buildWithConfig,
  createTargets,
  Platform,
} = require("electron-builder");

function getPackageTargets() {
  const targets = [Platform.WINDOWS];

  if (process.platform === "darwin") {
    targets.push(Platform.MAC);
  }

  return createTargets(targets);
}

function build() {
  if (process.platform === "linux") {
    return Promise.reject(
      new Error("Please try again with darwin or win32 environment.")
    );
  }

  return buildWithConfig({
    config: {
      productName: "Bellman",
      files: ["dist/**/*"],
      directories: {
        output: "release",
      },
      mac: {
        target: "dmg",
      },
      win: {
        target: "nsis",
      },
      nsis: {
        oneClick: false,
        createDesktopShortcut: true,
        createStartMenuShortcut: false,
      },
      publish: null,
    },
    targets: getPackageTargets(),
  });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
