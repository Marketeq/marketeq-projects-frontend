'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  fetchFavorites,
  addFavorite as addFav,
  moveFavorite as moveFav,
  removeFavorite as removeFav,
  FavoriteGroup
} from '@/service/favorites';

export function useFavorites() {
  const [groups, setGroups] = useState<FavoriteGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFavorites();
if (Array.isArray(data)) {
  setGroups(data);
} else {
  console.error(" Unexpected favorites response:", data);
  setGroups([]);
}

    } catch (err) {
      console.error('Failed to fetch favorites:', err);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (type: string, itemId: string, groupId?: string) => {
    await addFav(type, itemId, groupId);
    await fetchGroups();
  }, [fetchGroups]);

  const moveFavorite = useCallback(async (favId: string, groupId: string) => {
    await moveFav(favId, groupId);
    await fetchGroups();
  }, [fetchGroups]);

  const removeFavorite = useCallback(async (favId: string) => {
    await removeFav(favId);
    await fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);
  useEffect(() => {
  console.log("groups state updated:", groups);
}, [groups]);

  return { groups, loading, addFavorite, moveFavorite, removeFavorite };
}
