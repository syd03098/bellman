import React, {
  createContext,
  ReactNode,
  useCallback,
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

export const AppContext = createContext<AppStates | null>(null);

function fetchResults() {
  const fetched: Result[] = loadStorage(StorageKeys.Results);

  return fetched.length > 0
    ? fetched.sort((a, b) => b.date - a.date).filter((_, num) => num < 18)
    : [];
}

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

  useEffect(() => {
    saveStorage(StorageKeys.Results, results);
  }, [results]);

  const updateResults = useCallback(() => {
    const results = fetchResults();
    setResults(results);
  }, []);

  const intervalOptions: Readonly<Interval[]> = useMemo(
    () => defaultIntervalOptions,
    []
  );

  const courseOptions: Readonly<ExerciseOptions[]> = useMemo(
    () => defaultExerciseOptions,
    []
  );

  return (
    <AppContext.Provider
      value={{
        // settings
        interval,
        playSound,
        courses,
        setSettings,

        // option templates
        intervalOptions,
        courseOptions,

        // handling courses;
        pushCourse,
        deleteCourse,

        results,
        updateResults,
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
