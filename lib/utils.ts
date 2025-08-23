import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appConfig = {
  storyViewsToggle: process.env.STORY_VIEWS_TOGGLE === 'true' || process.env.STORY_VIEWS_TOGGLE === '1',
}