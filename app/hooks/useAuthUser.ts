import useSWR from 'swr';
import { getCurrentUser } from '@/api/authApi';

interface AuthUser {
    id: string;
    name: string;
    email: string;
}

interface UseAuthUserResult {
    user: AuthUser | undefined;
    isLoading: boolean;
    isError: boolean;
}

export function useAuthUser(): UseAuthUserResult {
  const { data, error, isLoading } = useSWR<AuthUser>('/me', () =>
    getCurrentUser().then((res) => res.data)
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
  };
}