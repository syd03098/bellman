import { Settings } from "@library/settings";

export const settingsKey = "settings";

export const saveStorage = (settings: Settings): void => {
  const settingsFormatted = JSON.stringify(settings);
  localStorage.setItem(settingsKey, settingsFormatted);
};

export const loadStorage = (key: string): any => {
  const stringifiedSettings = localStorage.getItem(key);

  console.log("savedSettings:", stringifiedSettings);

  if (!stringifiedSettings) {
    console.error("no saved localStorage settings:", `'${key}'`);
    return {};
  }

  return JSON.parse(stringifiedSettings);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
