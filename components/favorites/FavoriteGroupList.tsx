'use client';
import { FC, useEffect } from 'react';
import { useFavorites } from '@/hooks/favorites/useFavorites';
import { FavoriteItem } from './FavoriteItem';

export const FavoriteGroupList: FC = () => {
  const { groups, loading, moveFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    console.log('✅ groups state:', groups);
  }, [groups]);

  if (loading) return <div>Loading favorites…</div>;

  if (!Array.isArray(groups)) {
    return <div className="text-red-500">Error: Favorites data is invalid.</div>;
  }

  return (
    <div className="space-y-6">
      {groups.map(group => (
        <div key={group.id}>
          <h2 className="text-lg font-bold">{group.name}</h2>
          <div className="space-y-2">
            {Array.isArray(group.favorites) ? (
              group.favorites.map(fav => (
                <FavoriteItem
                  key={fav.id}
                  fav={fav}
                  groups={groups}
                  moveFavorite={moveFavorite}
                  removeFavorite={removeFavorite}
                />
              ))
            ) : (
              <div className="text-sm text-gray-500">No favorites in this group.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
