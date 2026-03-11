import { createContext } from 'react';
import { UserInfoResponse } from '@/types';

export type AuthInfo = {
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLoginSuccess: (userInfo: UserInfoResponse) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);
