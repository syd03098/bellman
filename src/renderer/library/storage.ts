import { Settings } from "@library/types";

export const settingsKey = "settings";

export const saveStorage = (settings: Settings): void => {
  const settingsFormatted = JSON.stringify(settings);
  localStorage.setItem(settingsKey, settingsFormatted);
};

export const loadStorage = (key: string): any => {
  const stringifiedSettings = localStorage.getItem(key);

  console.log("savedSettings:", stringifiedSettings);

  if (!stringifiedSettings) {
    return {};
  }

  return JSON.parse(stringifiedSettings);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
