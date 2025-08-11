import { apiClient } from '@/lib/apiClient';

export const matchFavorites = (input: string, group: string) =>
  apiClient.post('/ai/match', { input, group });