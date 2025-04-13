import { cardColors, FREQUENCY_OPTIONS, HabitStatus } from './constants';

export interface AuthResponse {
  message: string;
  token?: string;
}

export interface User {
  id: number;
  email: string;
  displayName?: string;
  avatar?: string;
}

export interface Habit {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  frequencyType: 'daily' | 'weekly' | 'custom';
  daysOfWeek: number[] | null;
  repeatEveryXDays: number | null;
  reminders: string[] | null;
  completedDates: string[];
  streak: number;
  hasEndDate: boolean;
  endDate: string | null;
  isArchived: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  userId: number;
  createdAt: string;
  color?: ColorVariant;
  updatedAt?: string;
}

export type FrequencyType = (typeof FREQUENCY_OPTIONS)[number]['value'];

export type HabitPayload = {
  title: string;
  description: string;
  frequencyType: FrequencyType;
  repeatEveryXDays: number | null;
};

export interface HabitStatusPayload {
  habitId: number;
  status: HabitStatus;
}

export type ColorVariant = keyof typeof cardColors;

export interface HabitDayPayload {
  habitId: number;
  date: string;
  completed: boolean;
}
