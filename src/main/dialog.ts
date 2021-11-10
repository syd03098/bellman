import { dialog, BrowserWindow } from "electron";

// eslint-disable-next-line no-shadow
export enum QuitResponse {
  Yes = 0,
  No,
}

export const askBeforeApplicationQuit = (window: BrowserWindow) => {
  const response = dialog.showMessageBoxSync(window, {
    type: "warning",
    buttons: ["Yes", "No"],
    title: "Quit",
    cancelId: -1,
    message: "프로그램을 종료하시겠습니까?",
  });

  if (response === -1 || response === 1) {
    return QuitResponse.No;
  }

  return QuitResponse.Yes;
};
