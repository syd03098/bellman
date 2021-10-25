import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import createCanvasWindow from "./canvas";

// BrowserWindow Object. avoid garbage collection
let window: BrowserWindow | null = null;

// Single instance lock. avoid more than one window
const gotTheLock = app.requestSingleInstanceLock();

const createWindow = async () => {
  window = new BrowserWindow({
    width: 320,
    height: 480,
    webPreferences: {
      // renderer process에서 Node.js를 사용하지않도록 설정 (avoid xss issues)
      // Node.js 에서 제공하는 fs, 같은걸 쓰고싶으면 main script 에서 handling 하도록 유도
      nodeIntegration: false,
      // preload scripts를 index.html과 다른 javascript context에서 실행하도록 설정 (security issue)
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  // todo: codes for production level
  if (process.env.NODE_ENV === "development") {
    await window.loadFile("index.html");
  }

  // Main handlers
  ipcMain.on("show-interval-options-dropdown", (event, args) => {
    const { options, selectedValue } = args;

    const menu = Menu.buildFromTemplate([
      ...options.map((option: { title: string; value: number }) => {
        return {
          label: option.title,
          checked: option.value === selectedValue,
          click: (): void =>
            window?.webContents.send("interval-options-dropdown-response", {
              title: option.title,
              value: option.value,
            }),
          type: "checkbox",
        };
      }),
    ]);

    menu.popup();
  });

  ipcMain.handle("open-external-canvas", async () => {
    await createCanvasWindow();
  });

  window.on("closed", () => {
    window = null;
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
