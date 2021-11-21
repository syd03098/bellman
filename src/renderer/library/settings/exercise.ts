export type Exercise = "squat";

export interface ExerciseCourse {
  id: string;
  exercise: Exercise;
  exerciseName: string;
  repeat: number;
}

export type ExerciseOptions = Omit<ExerciseCourse, "id" | "repeat">;

export type ExerciseSubmitType = Omit<ExerciseCourse, "id">;

export enum ExerciseName {
  squat = "스쿼트",
}

export const defaultExerciseOptions: Readonly<ExerciseOptions[]> = [
  {
    exercise: "squat",
    exerciseName: ExerciseName.squat,
  },
];
