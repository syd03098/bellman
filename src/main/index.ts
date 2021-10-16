import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";

// avoid garbage collection;
let window: BrowserWindow | null = null;

// single instance lock;
const gotTheLock = app.requestSingleInstanceLock();

const createWindow = () => {
  window = new BrowserWindow({
    width: 320,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    window.loadFile("index.html").finally();
  } else {
    window.loadFile("./dist/index.html").finally();
  }

  ipcMain.handle("github", async () => {
    return shell.openExternal(
      "https://www.electronjs.org/docs/latest/tutorial/quick-start#recap"
    );
  });

  window.on("closed", () => {
    window = null;
  });
};

if (!gotTheLock) {
  app.exit();
} else {
  app.whenReady().then(() => {
    // console.log('opened!!');
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        // console.log('opened again!!');
        createWindow();
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
