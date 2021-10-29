import { format } from "date-fns";
import { DateEn } from "@library/date";
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
  const [string, day] = format(new Date(), "yyyy-MM-dd,E").split(",");
  const translatedInKorean = DateTranslatedInKorean[day as DateEn];
  return `${string} ${translatedInKorean}`;
};

export const getUniqueKey = (): string => {
  return v4();
};
