import { useMemo } from 'react';
import { axiosInstance } from './api';
import { Habit, HabitPayload, HabitStatusPayload } from './interfaces';

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
      updateStatus: ({ habitId, status }: HabitStatusPayload): Promise<void> =>
        axiosInstance
          .patch<void>(`/habits/${habitId}`, {}, { params: { status } })
          .then((res) => res.data),
      updateHabit: (habitId: number, updates: Partial<Habit>): Promise<Habit> =>
        axiosInstance
          .patch<Habit>(`/habits/${habitId}`, updates)
          .then((res) => res.data),
      queryKey: HABITS,
    }),
    [],
  );
};

export { useHabitsApi };
