import { useContext } from 'react';
import { AuthContext } from '@/provider/Auth';

/**
 * Accesses the current authentication context.
 *
 * @throws Error if the hook is called outside of an AuthProvider.
 * @returns The current AuthContext value.
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}