import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(amount);
}

export function getAttendanceColor(rate: number) {
  if (rate >= 90) return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", badge: "text-emerald-700 font-semibold", dot: "bg-emerald-500", label: "Excellent" };
  if (rate >= 75) return { bg: "bg-sky-50 text-sky-700 border-sky-200", badge: "text-sky-700 font-semibold", dot: "bg-sky-500", label: "Good" };
  return { bg: "bg-rose-50 text-rose-700 border-rose-200", badge: "text-rose-700 font-semibold", dot: "bg-rose-500", label: "Warning (<75%)" };
}

export function getGradeBadge(grade: string) {
  switch (grade) {
    case "O":
    case "A+":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "A":
    case "B+":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "B":
    case "C":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-rose-50 text-rose-700 border-rose-200";
  }
}
