import { SetStateAction, Dispatch } from "react";

export interface AppStates {
  isActivated: boolean;
  settings: Settings;
  history: Result[];
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
