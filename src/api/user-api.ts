import { useMemo } from 'react';
import { User } from './interfaces';
import { axiosInstance } from './api';

const USER = 'users';

const useUserApi = () => {
  return useMemo(
    () => ({
      update: (payload: User) => {
        axiosInstance
          .post<User>(`/users/${payload.id}`, payload)
          .then(({ data }) => data)
          .catch((error) => Promise.reject(error));
      },
      queryKey: USER,
    }),
    [],
  );
};

export default useUserApi;
