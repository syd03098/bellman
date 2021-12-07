import path from "path";
import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import { askBeforeApplicationQuit, QuitResponse } from "./dialog";
import createTrayService from "./trayService";
import createCanvasWindow from "./canvas";

// avoid garbage collection
let window: BrowserWindow | null = null;
let tray: Tray | null = null;

// Single instance lock. avoid more than one window
const gotTheLock = app.requestSingleInstanceLock();
const isDevelopment = process.env.NODE_ENV === "development";

const createWindow = async () => {
  initializeRootWindow();
  tray = createTrayService(window);

  const fileUrl = path.resolve(__dirname, "index.html");
  await window?.loadFile(fileUrl);

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

  ipcMain.handle("open-external-canvas", async (event, restart = false) => {
    await createCanvasWindow(window, restart);
  });
};

function initializeRootWindow() {
  window = new BrowserWindow({
    width: 320,
    height: 480,
    maximizable: isDevelopment,
    resizable: isDevelopment,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  window.on("blur", () => {
    if (!window || isDevelopment) {
      return;
    }

    window.hide();
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
}

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
