import { createContext, useContext, useEffect, useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { useAuthApi } from '../api/auth-api';

import { AuthResponse, User } from 'src/api/interfaces';

interface AuthContextType {
  user: User | null;
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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { register, login, logout, getUser } = useAuthApi();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const data = await getUser.refetch();

          setUser(data.data || null);
        } catch {
          localStorage.removeItem('token');

          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
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
