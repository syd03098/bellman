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
import { isProgramLostFocus, ProgramStatus } from "@library/program";
import { loadStorage, saveStorage } from "@library/storage";
import { useTimer as useTimeout } from "use-timer";
import { StorageKeys } from "@library/storage/keys";
import { AppStates } from "@library/types";
import { Result } from "@library/settings/reulsts";
import useSettings from "@hooks/useSettings";

function fetchResults() {
  const fetched: Result[] = loadStorage(StorageKeys.Results);

  return fetched.length > 0
    ? fetched.sort((a, b) => b.date - a.date).filter((_, num) => num < 18)
    : [];
}

export const AppContext = createContext<AppStates | null>(null);

const { openExternalCanvas } = window.electronOnly;

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
  const [status, updateStatus] = useState<ProgramStatus>(ProgramStatus.Stopped);

  useEffect(() => {
    saveStorage(StorageKeys.Results, results);
  }, [results]);

  const { start: startTimeout, reset: resetTimeout } = useTimeout({
    initialTime: interval ?? undefined,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: async () => {
      updateStatus(ProgramStatus.Suspended);
      await openExternalCanvas();
    },
  });

  const toggleTimeout = useCallback(() => {
    if (isProgramLostFocus[status]) {
      return;
    }

    if (status === ProgramStatus.Stopped) {
      updateStatus(ProgramStatus.Running);
      startTimeout();
    } else {
      updateStatus(ProgramStatus.Stopped);
      resetTimeout();
    }
  }, [resetTimeout, startTimeout, status]);

  const updateResults = useCallback(() => {
    const results = fetchResults();
    setResults(results);

    if (!isProgramLostFocus[status]) {
      return;
    }

    if (status === ProgramStatus.Suspended) {
      updateStatus(ProgramStatus.Running);
      startTimeout();
    } else {
      updateStatus(ProgramStatus.Stopped);
    }
  }, [startTimeout, status]);

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
        programStatus: status,
        toggleTimeout,
        setProgramStatus: updateStatus,

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
