import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';

import { AuthResponse, User } from 'src/api/interfaces';
import { queryClient } from '../api/queryClient';
import { useAuthApi } from '../api/auth-api';

interface AuthContextType {
  user?: User;
  loading: boolean;
  register: UseMutationResult<
    AuthResponse,
    Error,
    { email: string; password: string }
  >;
  login: UseMutationResult<
    AuthResponse,
    Error,
    { email: string; password: string }
  >;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authApi = useAuthApi();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryFn: authApi.getUser,
    queryKey: [authApi.queryKey],
    staleTime: 1000 * 60 * 5,
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authApi.queryKey] });
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authApi.queryKey] });

      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutateAsync: mutateLogout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        register: registerMutation,
        login: loginMutation,
        logout: mutateLogout,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
