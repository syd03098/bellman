import { BrowserWindow, nativeImage, Tray, app } from "electron";
import path from "path";

export default function createTrayService(rootWindow: BrowserWindow | null) {
  const iconPath = path.resolve(__dirname, "./public/app-icon.png");
  const image =
    process.platform === "win32"
      ? nativeImage.createFromPath(iconPath)
      : nativeImage.createEmpty();

  const tray = new Tray(image);
  tray.setTitle("Bellman");
  tray.setToolTip("Bellman: UOS Computer Science 2021");
  tray.on("double-click", () => {
    rootWindow?.show();
  });

  app.on("before-quit", () => {
    tray.destroy();
  });

  return tray;
}
