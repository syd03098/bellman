import { BrowserWindow } from "electron";
import path from "path";
import { getRootWindow } from "./index";

let canvas: BrowserWindow | null = null;

export const createCanvasWindow = async () => {
  if (canvas) {
    return;
  }

  canvas = new BrowserWindow({
    width: 880,
    height: 720,
    minimizable: false,
    alwaysOnTop: true,
  });

  // todo: src 디렉토리 내부에 bellman-canvas 프로젝트를 포함시키고,
  //  dist > canvas 디렉토리에 빌드하면 될것같음.
  await canvas.loadFile(path.resolve(__dirname, "canvas/index.html"));

  canvas.on("close", () => {
    if (!canvas) {
      return;
    }

    const rootWindow = getRootWindow();

    rootWindow?.webContents.send("canvas-closed");
  });

  canvas.on("closed", () => {
    canvas = null;
  });
};

export default createCanvasWindow;
