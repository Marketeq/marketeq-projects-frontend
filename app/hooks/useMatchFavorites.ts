import { useState } from 'react';
import { matchFavorites } from '@/api/aiApi';
import { Favorite } from '@/types/favorites';

export function useMatchFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<Favorite[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runMatch = async (input: string, group: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await matchFavorites(input, group);
      setMatches(res.data);
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    runMatch,
    matches,
    isLoading,
    error,
  };
}