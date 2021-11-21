import { Exercise } from "@library/settings/exercise";

export interface Result {
  date: number;
  exercise: Exercise;
  hadSucceeded: boolean;
}
