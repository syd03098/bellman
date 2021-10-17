import React, { createContext, ReactNode, useContext, useState } from "react";
import { AppStates, defaultSettings, Result, Settings } from "@library/types";
import { useLocation } from "react-router-dom";
import { PathMap, PathRawName } from "@library/path";

export const AppContext = createContext<AppStates | null>(null);

// todo: initialSettings = defaultSettings + fetchedSettings;

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const pathName = PathMap[location.pathname as PathRawName];
  const [isActivated, setActivated] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [result, setResult] = useState<Result[]>([]);

  return (
    <AppContext.Provider
      value={{
        pathName,
        isActivated,
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
