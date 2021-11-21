import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ExerciseCourse, ExerciseSubmitType } from "@library/settings/exercise";
import { defaultSettings, Settings } from "@library/settings";
import { loadStorage, saveStorage } from "@library/storage";
import { getUniqueKey } from "@library/utils";
import { StorageKeys } from "@library/storage/keys";
import { Nullable } from "@library/global";

interface SettingsState {
  interval: Nullable<number>;
  courses: ExerciseCourse[];
  playSound: boolean;
  setSettings: Dispatch<SetStateAction<Settings>>;

  // handling courses
  pushCourse: (course: ExerciseSubmitType) => void;
  deleteCourse: (id: string) => void;
}

const useSettings = (): SettingsState => {
  const [settings, setSettings] = useState<Settings>(() => {
    return {
      ...defaultSettings,
      ...loadStorage(StorageKeys.Settings),
    };
  });

  const pushCourse = useCallback((newCourse: ExerciseSubmitType) => {
    setSettings((prev) => {
      const merged: ExerciseCourse[] = [
        ...prev.courses,
        {
          id: getUniqueKey(),
          ...newCourse,
        },
      ];
      return {
        ...prev,
        courses: merged,
      };
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

  useEffect(() => {
    saveStorage(StorageKeys.Settings, settings);
  }, [settings]);

  return {
    interval: settings.interval,
    playSound: settings.playSound,
    courses: settings.courses,
    setSettings,

    pushCourse,
    deleteCourse,
  };
};

export default useSettings;
