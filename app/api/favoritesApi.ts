import { apiClient } from '@/lib/apiClient';

export const renameGroup = (groupId: string, name: string) =>
  apiClient.patch(`/favorites/groups/${groupId}`, { name });

export const deleteGroup = (groupId: string) =>
  apiClient.delete(`/favorites/groups/${groupId}`);

export const moveFavorite = (favoriteId: string, groupId: string) =>
  apiClient.patch(`/favorites/${favoriteId}`, { groupId });

export const removeFavorite = (favoriteId: string) =>
  apiClient.delete(`/favorites/${favoriteId}`);

export const addFavorite = (groupId: string, metadata: any) =>
  apiClient.post('/favorites', {
    groupId,
    metadata,
  });