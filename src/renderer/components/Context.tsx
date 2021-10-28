import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppStates, Result } from "@library/types";
import { useLocation } from "react-router-dom";
import { PathMap, PathRawName } from "@library/path";
import {
  defaultIntervalOptions,
  defaultSettings,
  Interval,
  Settings,
} from "@library/settings";
import { loadStorage, saveStorage, settingsKey } from "@library/storage";

export const AppContext = createContext<AppStates | null>(null);

const initialSettings = {
  ...defaultSettings,
  ...loadStorage(settingsKey),
};

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const pathName = PathMap[location.pathname as PathRawName];

  // todo: handling isActivated value;
  const [isActivated, setActivated] = useState<boolean>(false);

  // working on it
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const intervalOptions: Readonly<Interval[]> = useMemo(
    () => [...defaultIntervalOptions],
    []
  );

  // todo: handling result value;
  const [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    saveStorage(settings);
  }, [settings]);

  return (
    <AppContext.Provider
      value={{
        pathName,
        isActivated,
        intervalOptions,
        settings,
        result,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const store = useContext(AppContext);
  if (!store) {
    throw new Error("AppContext is missing");
  }
  return store;
};
