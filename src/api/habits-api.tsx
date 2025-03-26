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
      markAsCompleted: (habitId: number, date: string): Promise<void> =>
        axiosInstance
          .post(`/habits/${habitId}/complete`, { date })
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      archiveHabit: (habitId: number): Promise<void> =>
        axiosInstance
          .post(`/habits/${habitId}/archive`)
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      queryKey: HABITS,
    }),
    [],
  );
};

export { useHabitsApi };
