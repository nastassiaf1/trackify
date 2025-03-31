import { useMemo } from 'react';
import { axiosInstance } from './api';
import { Habit, HabitPayload } from './interfaces';

const HABITS = 'habits';

const useHabitsApi = () => {
  return useMemo(
    () => ({
      getHabits: (): Promise<Habit[]> =>
        axiosInstance
          .get('/habits')
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      addHabit: (data: HabitPayload) =>
        axiosInstance
          .post<Habit>('/habits', data)
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      markAsCompleted: (habitId: number): Promise<void> =>
        axiosInstance
          .patch<void>(`/habits/${habitId}`, { isCompleted: true })
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      archiveHabit: (habitId: number): Promise<void> =>
        axiosInstance
          .patch<void>(`/habits/${habitId}`, { isArchived: true })
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      queryKey: HABITS,
    }),
    [],
  );
};

export { useHabitsApi };
