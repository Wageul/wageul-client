import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateIsPassed(dateTimeString: string) {
  const input = new Date(dateTimeString) ;
  const now = new Date();

  return input < now;
}