import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import nlp from 'compromise';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

