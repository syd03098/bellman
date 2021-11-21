import format from "date-fns/format";
import { DateEn, timeIntervals } from "@library/date";
import { v4 } from "uuid";

export const DateTranslatedInKorean: Readonly<Record<DateEn, string>> = {
  Mon: "월요일",
  Tue: "화요일",
  Wed: "수요일",
  Thu: "목요일",
  Fri: "금요일",
  Sat: "토요일",
  Sun: "일요일",
};

export const getFormattedDate = (): string => {
  const [string, day] = format(Date.now(), "yyyy-MM-dd,E").split(",");
  return `${string} ${DateTranslatedInKorean[day as DateEn]}`;
};

export const getDateFromNow = (time: number): string => {
  const seconds = Math.floor((Date.now() - time) / 1000);
  const index = timeIntervals.findIndex((value) => value.seconds < seconds);

  if (index === -1) {
    return "invalid";
  }

  const interval = timeIntervals[index];
  const count = Math.floor(seconds / interval.seconds);

  switch (interval.label) {
    case "방금":
      return "방금전";
    default:
      return `${count}${interval.label}전`;
  }
};

export const getUniqueKey = (): string => {
  return v4();
};
