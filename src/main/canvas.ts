import { BrowserWindow } from "electron";
import path from "path";

let canvas: BrowserWindow | null = null;

export const createCanvasWindow = async (rootWindow: BrowserWindow | null) => {
  if (canvas) {
    return;
  }

  canvas = new BrowserWindow({
    width: 1024,
    height: 768,
    maximizable: true,
    minimizable: false,
    alwaysOnTop: true,
  });

  const fileUrl = path.resolve(__dirname, "canvas/index.html");
  await canvas.loadFile(fileUrl);

  canvas.on("close", () => {
    if (canvas) {
      rootWindow?.webContents.send("canvas-closed");
    }
  });

  canvas.on("closed", () => {
    canvas = null;
  });
};

export default createCanvasWindow;
