import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (amount: number, currency: any) => {
  if (currency.position === "before") {
    return `${currency.symbol}${amount}`;
  } else {
    return `${amount}${currency.symbol}`;
  }
};
