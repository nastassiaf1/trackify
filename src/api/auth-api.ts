import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from './api';
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
  message: string;
  token?: string;
}

interface User {
  id: number;
  email: string;
}

export const useAuthApi = () => {
  const navigate = useNavigate();

  return {
    register: useMutation<
      AuthResponse,
      Error,
      { email: string; password: string }
    >({
      mutationFn: async ({ email, password }) => {
        const res = await axiosInstance.post<AuthResponse>('/auth/register', {
          email,
          password,
        });

        if (res.data.token) localStorage.setItem('token', res.data.token);

        return res.data;
      },
    }),
    login: useMutation<
      AuthResponse,
      Error,
      { email: string; password: string }
    >({
      mutationFn: async ({ email, password }) => {
        const res = await axiosInstance.post<AuthResponse>('/auth/login', {
          email,
          password,
        });

        if (res.data.token) localStorage.setItem('token', res.data.token);

        return res.data;
      },
    }),
    logout: () => {
      localStorage.removeItem('token');
      navigate('/login');
    },
    getUser: useQuery<User | null>({
      queryKey: ['me'],
      queryFn: async () => {
        const res = await axiosInstance.get<User>('/auth/me');
        return res.data;
      },
      enabled: !!localStorage.getItem('token'),
    }),
  };
};
