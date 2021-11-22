import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from "electron";
import path from "path";
import { askBeforeApplicationQuit, QuitResponse } from "./dialog";
import createCanvasWindow from "./canvas";

// avoid garbage collection
let window: BrowserWindow | null = null;
let tray: Tray | null = null;

// Single instance lock. avoid more than one window
const gotTheLock = app.requestSingleInstanceLock();

export const getRootWindow = () => {
  return window ?? null;
};

const createWindow = async () => {
  window = new BrowserWindow({
    width: 320,
    height: 480,
    maximizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  tray = new Tray(
    process.platform === "win32"
      ? nativeImage.createFromPath(
          path.resolve(__dirname, "./public/app-icon.png")
        )
      : nativeImage.createEmpty()
  );
  tray.setTitle("Bellman");
  tray.on("double-click", () => {
    if (window === null) {
      return;
    }

    window?.show();
  });

  await window.loadFile("index.html");

  window.on("blur", () => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    window?.hide();
  });

  window.on("close", (event) => {
    if (!window) {
      return;
    }

    const response = askBeforeApplicationQuit(window);

    if (response === QuitResponse.No) {
      event.preventDefault();
    }
  });

  window.on("closed", () => {
    window = null;
  });

  ipcMain.on("open-edit-options", (event, args) => {
    const menu = Menu.buildFromTemplate([
      {
        label: "삭제",
        type: "normal",
        click: (): void => window?.webContents.send("delete-course", args),
      },
    ]);

    menu.popup();
  });

  ipcMain.handle("open-external-canvas", async () => {
    await createCanvasWindow();
  });
};

if (!gotTheLock) {
  app.exit();
} else {
  app.whenReady().then(async () => {
    await createWindow();

    app.on("activate", async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

export default { getRootWindow };
