import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppStates, Result } from "@library/types";
import { defaultSettings, Settings } from "@library/settings";
import { defaultIntervalOptions, Interval } from "@library/settings/interval";
import { loadStorage, saveStorage, settingsKey } from "@library/storage";
import {
  defaultExerciseOptions,
  ExerciseCourse,
} from "@library/settings/exercise";

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
  // todo: handling isActivated value;
  const [isActivated, setActivated] = useState<boolean>(false);

  const [settings, setSettings] = useState<Settings>(initialSettings);

  const intervalOptions: Readonly<Interval[]> = useMemo(
    () => [...defaultIntervalOptions],
    []
  );

  const pushCourse = useCallback((course: ExerciseCourse) => {
    setSettings((prev) => {
      return { ...prev, courses: [...prev.courses, course] };
    });
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setSettings((prev) => {
      return {
        ...prev,
        courses: prev.courses.filter((item) => item.id !== id),
      };
    });
  }, []);

  const courseOptions = useMemo(() => [...defaultExerciseOptions], []);

  // todo: handling result value;
  const [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    saveStorage(settings);
  }, [settings]);

  return (
    <AppContext.Provider
      value={{
        isActivated,
        settings,

        // option templates
        intervalOptions,
        courseOptions,

        // handling courses;
        pushCourse,
        deleteCourse,

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
