import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultIntervalOptions, Interval } from "@library/settings/interval";
import {
  defaultExerciseOptions,
  ExerciseOptions,
} from "@library/settings/exercise";
import { loadStorage, saveStorage } from "@library/storage";
import { StorageKeys } from "@library/storage/keys";
import { AppStates } from "@library/types";
import { Result } from "@library/settings/reulsts";
import useSettings from "@hooks/useSettings";

function fetchResults() {
  const fetched: Result[] = loadStorage(StorageKeys.Results);

  return fetched.length > 0
    ? fetched.sort((a, b) => b.date - a.date).filter((_, num) => num < 12)
    : [];
}

export const AppContext = createContext<AppStates | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const {
    interval,
    playSound,
    courses,
    pushCourse,
    deleteCourse,
    setSettings,
  } = useSettings();

  const [results, setResults] = useState<Result[]>(() => fetchResults());

  const intervalOptions: Readonly<Interval[]> = useMemo(
    () => defaultIntervalOptions,
    []
  );

  const courseOptions: Readonly<ExerciseOptions[]> = useMemo(
    () => defaultExerciseOptions,
    []
  );

  useEffect(() => {
    saveStorage(StorageKeys.Results, results);
  }, [results]);

  return (
    <AppContext.Provider
      value={{
        // settings
        interval,
        playSound,
        courses,

        // option templates
        intervalOptions,
        courseOptions,

        // handling courses;
        pushCourse,
        deleteCourse,

        results,
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
