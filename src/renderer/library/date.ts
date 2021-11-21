export type DateEn = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

type TimeInterval = {
  label: string;
  seconds: number;
};

export const timeIntervals: TimeInterval[] = [
  { label: "년", seconds: 31536000 },
  { label: "개월", seconds: 2592000 },
  { label: "일", seconds: 86400 },
  { label: "시간", seconds: 3600 },
  { label: "분", seconds: 60 },
  { label: "방금", seconds: 1 },
];
