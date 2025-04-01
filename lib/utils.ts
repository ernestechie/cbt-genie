import { clsx, type ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addLuxonHours(hours: number) {
  return DateTime.now().plus({ hours }).toJSDate();
}

export const tokenHasExpired = (time?: number) => {
  if (!time) return true;

  let tokenExpired = false;
  // Check if token more than 24 hours
  const expiryDate = new Date(time).getTime() * 1000;
  const todayDate = new Date().getTime();

  const timeDifference = todayDate - expiryDate;
  // Check if token more than 24 hours
  const timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

  if (timeDifferenceInHours >= 24) tokenExpired = true;

  return tokenExpired;
};
