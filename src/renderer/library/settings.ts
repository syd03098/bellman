import { ExerciseCourse } from "@library/settings/exercise";
import { Nullable } from "@library/global";

export interface Settings {
  interval: Nullable<number>;
  playSound: boolean;
  courses: ExerciseCourse[];
}

export const defaultSettings: Readonly<Settings> = {
  interval: null,
  playSound: false,
  courses: [],
};
