import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with full conflict resolution.
 * * This utility function combines two powerful libraries:
 * 1. clsx: For conditionally combining class strings, arrays, and objects.
 * 2. twMerge: For automatically resolving conflicting Tailwind classes 
 * (e.g., 'p-4' and 'p-8' will correctly merge to 'p-8').
 * * @param inputs A list of class strings, arrays, or objects to merge.
 * @returns A single, optimized class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}