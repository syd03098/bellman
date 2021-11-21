import { StorageKeys } from "@library/storage/keys";
import { Settings } from "@library/settings";
import { Result } from "@library/settings/reulsts";

export const saveStorage = (
  key: StorageKeys,
  value: Settings | Result[]
): void => {
  const settingsFormatted = JSON.stringify(value);
  localStorage.setItem(key, settingsFormatted);
};

export const loadStorage = (key: string): any => {
  const fetchedItem = localStorage.getItem(key);

  console.log(`${key}:`, fetchedItem);

  if (!fetchedItem) {
    console.error("no saved localStorage settings:", `'${key}'`);
    return key === StorageKeys.Settings ? {} : [];
  }

  return JSON.parse(fetchedItem);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
