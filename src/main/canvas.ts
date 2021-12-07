import { BrowserWindow } from "electron";
import path from "path";

let canvas: BrowserWindow | null = null;

export const createCanvasWindow = async (
  rootWindow: BrowserWindow | null,
  restart: boolean
) => {
  if (canvas) {
    return;
  }

  canvas = new BrowserWindow({
    show: false,
    maximizable: true,
    minimizable: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
  });

  const fileUrl = path.resolve(__dirname, "canvas/index.html");
  await canvas.loadFile(fileUrl);

  canvas.maximize();
  canvas.show();

  canvas.on("close", () => {
    if (canvas) {
      rootWindow?.webContents.send("canvas-closed", restart);
    }
  });

  canvas.on("closed", () => {
    canvas = null;
  });
};

export default createCanvasWindow;
