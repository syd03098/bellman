import { format } from "date-fns";
import { DateEn } from "@library/date";

export const DateTranslatedInKorean: Readonly<Record<DateEn, string>> = {
  Mon: "월요일",
  Tus: "화요일",
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
