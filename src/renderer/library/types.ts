import { SetStateAction, Dispatch } from "react";
import { PathType } from "@library/path";
import { Interval, Settings } from "@library/settings";
import {
  Exercise,
  ExerciseCourse,
  ExerciseOptions,
} from "@library/settings/exercise";

export interface AppStates {
  pathName: PathType;
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
