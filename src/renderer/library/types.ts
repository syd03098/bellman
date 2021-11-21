import { SetStateAction, Dispatch } from "react";
import { Settings } from "@library/settings";
import { Interval } from "@library/settings/interval";
import {
  Exercise,
  ExerciseCourse,
  ExerciseOptions,
} from "@library/settings/exercise";

export interface AppStates {
  isActivated: boolean;

  // settings;
  settings: Settings;

  // option templates
  intervalOptions: Readonly<Interval[]>;
  courseOptions: Readonly<ExerciseOptions[]>;

  // handling courses
  pushCourse: (course: ExerciseCourse) => void;
  deleteCourse: (id: string) => void;

  result: Result[];
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export interface Result {
  date: number;
  exercise: Exercise;
  hadSucceeded: boolean;
}
