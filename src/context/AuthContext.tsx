import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getCurrentUser, loginAccount, registerAccount } from '../api/authApi';
import type { LoginCredentials, RegisterPayload, User } from '../types/api';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const persistSession = (token: string | null, user: User | null) => {
  if (token && user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        setUser(response.data);
        persistSession(token, response.data);
      } catch {
        persistSession(null, null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void restoreSession();
  }, [token]);

  const applyAuth = (data: { token: string; user: User }) => {
    setToken(data.token);
    setUser(data.user);
    persistSession(data.token, data.user);
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await loginAccount(credentials);
    applyAuth(response.data);
    return response.data.user;
  };

  const register = async (payload: RegisterPayload) => {
    const response = await registerAccount(payload);
    applyAuth(response.data);
    return response.data.user;
  };

  const logout = () => {
    persistSession(null, null);
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
