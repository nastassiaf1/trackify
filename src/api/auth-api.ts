import { useMemo } from 'react';
import { axiosInstance } from './api';

interface AuthResponse {
  message: string;
  token?: string;
}

interface User {
  id: number;
  email: string;
  displayName?: string;
  avatar?: string;
}

const USER_KEY = 'user';

const useAuthApi = () => {
  return useMemo(
    () => ({
      register: (payload: { email: string; password: string }) =>
        axiosInstance
          .post<AuthResponse>('/auth/register', payload)
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      login: (payload: { email: string; password: string }) =>
        axiosInstance
          .post<AuthResponse>('/auth/login', payload)
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      logout: () =>
        axiosInstance
          .post('/auth/logout', {}, { withCredentials: true })
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      getUser: () =>
        axiosInstance
          .get<User>('/auth/user', { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .catch((error) => Promise.reject(error)),
      queryKey: USER_KEY,
    }),
    [],
  );
};

export { useAuthApi, USER_KEY };
