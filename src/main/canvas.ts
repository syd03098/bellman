import { BrowserWindow } from "electron";
import path from "path";

let canvasWindow: BrowserWindow | null = null;

export const createCanvasWindow = async () => {
  canvasWindow = new BrowserWindow({
    width: 880,
    height: 720,
    minimizable: false,
  });

  // todo: src 디렉토리 내부에 bellman-canvas 프로젝트를 포함시키고,
  //  dist > canvas 디렉토리에 빌드하면 될것같음.
  await canvasWindow.loadFile(path.resolve(__dirname, "canvas/index.html"));

  canvasWindow.on("closed", () => {
    canvasWindow = null;
  });
};

export default createCanvasWindow;
