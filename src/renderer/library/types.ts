import { SetStateAction, Dispatch } from "react";
import { PathType } from "@library/path";

export interface AppStates {
  pathName: PathType;
  isActivated: boolean;
  settings: Settings;
  result: Result[];
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export const defaultSettings: Readonly<Settings> = {
  interval: 0,
  playSound: false,
  courses: [],
};

export interface Settings {
  interval: number;
  playSound: boolean;
  courses: ExerciseCourse[];
}

export interface Result {
  date: number;
  exercise: Exercise;
  hadSucceeded: boolean;
}

export interface ExerciseCourse {
  exerciseName: Exercise;
  repeat: number;
}

export type Exercise = "pushup" | "yoga" | string;
