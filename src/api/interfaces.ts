import { ColorVariant } from 'src/pages/profile/board/constants';
import { FREQUENCY_OPTIONS } from './constants';

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
  color?: ColorVariant;
}

export type FrequencyType = (typeof FREQUENCY_OPTIONS)[number]['value'];

export type HabitPayload = {
  title: string;
  description: string;
  frequencyType: FrequencyType;
  repeatEveryXDays: number | null;
};
