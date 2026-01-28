import { createContext } from 'react';

export type AuthInfo = {
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLoginSuccess: () => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);
