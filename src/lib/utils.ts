import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...value: ClassValue[]) {
  return twMerge(clsx(value));
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(date);

  return formattedDate;
}
