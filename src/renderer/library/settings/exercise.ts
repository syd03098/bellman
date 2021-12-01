export type Exercise = "squat" | "breathing" | "side";

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
  breathing = "숨쉬기운동",
  side = "옆구리운동",
}

export const defaultExerciseOptions: Readonly<ExerciseOptions[]> = [
  {
    exercise: "squat",
    exerciseName: ExerciseName.squat,
  },
  {
    exercise: "breathing",
    exerciseName: ExerciseName.breathing,
  },
  {
    exercise: "side",
    exerciseName: ExerciseName.side,
  },
];
