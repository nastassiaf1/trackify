import {
  addDays,
  isBefore,
  isSameDay,
  format,
  getDay,
  parseISO,
} from 'date-fns';
import { Habit } from 'src/api/interfaces';

export const generateKeyDates = (habit: Habit): string[] => {
  const start = new Date(habit.createdAt);
  const today = new Date();
  const result: string[] = [];

  const endDate =
    habit.hasEndDate && habit.endDate ? new Date(habit.endDate) : today;
  const finalDate = isBefore(endDate, today) ? endDate : today;

  if (habit.frequencyType === 'custom' && habit.repeatEveryXDays) {
    let current = start;

    while (isBefore(current, finalDate) || isSameDay(current, finalDate)) {
      result.push(format(current, 'yyyy-MM-dd'));
      current = addDays(current, habit.repeatEveryXDays);
    }
  }

  if (habit.frequencyType === 'daily') {
    let current = start;

    while (isBefore(current, finalDate) || isSameDay(current, finalDate)) {
      result.push(format(current, 'yyyy-MM-dd'));
      current = addDays(current, 1);
    }
  }

  if (habit.frequencyType === 'weekly') {
    let current = start;

    while (isBefore(current, today) || isSameDay(current, today)) {
      result.push(format(current, 'yyyy-MM-dd'));
      current = addDays(current, 7);
    }
  }

  if (Array.isArray(habit.daysOfWeek)) {
    let current = start;

    while (isBefore(current, finalDate) || isSameDay(current, finalDate)) {
      const day = getDay(current);

      if (habit.daysOfWeek.includes(day)) {
        result.push(format(current, 'yyyy-MM-dd'));
      }

      current = addDays(current, 1);
    }
  }

  return result;
};

export const getNextPlannedDate = (
  habit: Habit,
  keyDays: string[],
): string | null => {
  if (!keyDays.length) return null;

  const lastDate = parseISO(keyDays[keyDays.length - 1]);

  if (habit.frequencyType === 'custom' && habit.repeatEveryXDays) {
    return format(addDays(lastDate, habit.repeatEveryXDays), 'yyyy-MM-dd');
  }

  if (habit.frequencyType === 'daily') {
    return format(addDays(lastDate, 1), 'yyyy-MM-dd');
  }

  if (habit.frequencyType === 'weekly') {
    return format(addDays(lastDate, 7), 'yyyy-MM-dd');
  }

  if (Array.isArray(habit.daysOfWeek)) {
    let nextDate = addDays(lastDate, 1);
    for (let i = 0; i < 14; i++) {
      if (habit.daysOfWeek.includes(getDay(nextDate))) {
        return format(nextDate, 'yyyy-MM-dd');
      }
      nextDate = addDays(nextDate, 1);
    }
  }

  return null;
};
