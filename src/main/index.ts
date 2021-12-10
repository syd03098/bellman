import path from "path";
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  Tray,
  dialog,
} from "electron";
import createCanvasWindow from "./canvas";

// avoid garbage collection
let window: BrowserWindow | null = null;
let tray: Tray | null = null;

// Single instance lock. avoid more than one window
const gotTheLock = app.requestSingleInstanceLock();
const isDevelopment = process.env.NODE_ENV === "development";

const createWindow = async () => {
  initializeRootWindow();
  createTrayService();

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

  window.on("close", async (e) => {
    if (!window) {
      return;
    }

    e.preventDefault();

    const { response } = await dialog.showMessageBox(window, {
      type: "warning",
      buttons: ["Yes", "No"],
      title: "Quit",
      cancelId: 1,
      message: "프로그램을 종료하시겠습니까?",
    });

    if (response === 0) {
      window.destroy();
      tray?.destroy();

      app.quit();
    }
  });
}

function createTrayService() {
  const iconPath = path.resolve(__dirname, "./public/app-icon.png");
  const image =
    process.platform === "win32"
      ? nativeImage.createFromPath(iconPath)
      : nativeImage.createEmpty();

  tray = new Tray(image);
  tray.setTitle("Bellman");
  tray.setToolTip("Bellman: UOS Computer Science 2021");
  tray.on("double-click", () => {
    window?.show();
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
