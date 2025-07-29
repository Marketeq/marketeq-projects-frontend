import AxiosRequest from '@/service';
import { AxiosResponse } from 'axios';

export interface Favorite {
  id: string;
  type: string;
  itemId: string;
  groupId?: string;
}

export interface FavoriteGroup {
  id: string;
  name: string;
  title?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  favorites: Favorite[];
}

// GET /favorites
export const fetchFavorites = async (): Promise<FavoriteGroup[]> => {
  const res: AxiosResponse<FavoriteGroup[]> = await AxiosRequest.get('/favorites');
  return res.data;
};

// POST /favorites
export const addFavorite = async (type: string, itemId: string, groupId?: string): Promise<void> => {
  const payload = groupId ? { type, itemId, groupId } : { type, itemId };
  await AxiosRequest.post('/favorites', payload);
};

// PATCH /favorites/:id
export const moveFavorite = async (favId: string, groupId: string): Promise<void> => {
  await AxiosRequest.patch(`/favorites/${favId}`, { groupId });
};

// DELETE /favorites/:id
export const removeFavorite = async (favId: string): Promise<void> => {
  await AxiosRequest.del(`/favorites/${favId}`);
};
