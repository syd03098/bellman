import { SetStateAction, Dispatch } from "react";
import { PathType } from "@library/path";
import { Exercise, Settings } from "@library/settings";

export interface AppStates {
  pathName: PathType;
  isActivated: boolean;
  settings: Settings;
  result: Result[];
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export interface Result {
  date: number;
  exercise: Exercise;
  hadSucceeded: boolean;
}
