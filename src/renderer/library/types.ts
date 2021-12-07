import { SetStateAction, Dispatch } from "react";
import {
  ExerciseCourse,
  ExerciseOptions,
  ExerciseSubmitType,
} from "@library/settings/exercise";
import { ProgramStatus } from "@library/program";
import { Nullable } from "@library/global";
import { Interval } from "@library/settings/interval";
import { Settings } from "@library/settings";
import { Result } from "@library/settings/reulsts";

export interface AppStates {
  // settings;
  interval: Nullable<number>;
  courses: ExerciseCourse[];
  playSound: boolean;
  setSettings: Dispatch<SetStateAction<Settings>>;

  // option templates
  intervalOptions: Readonly<Interval[]>;
  courseOptions: Readonly<ExerciseOptions[]>;

  // handling courses
  pushCourse: (course: ExerciseSubmitType) => void;
  deleteCourse: (id: string) => void;

  results: Result[];
  updateResults: () => void;
}
