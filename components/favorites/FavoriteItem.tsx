'use client';
import { FC } from 'react';
import { FavoriteGroup } from '@/service/favorites';

interface Props {
  fav: { id: string; type: string; itemId: string; groupId?: string };
  groups: FavoriteGroup[];
  moveFavorite: (favId: string, groupId: string) => Promise<void>;
  removeFavorite: (favId: string) => Promise<void>;
}

export const FavoriteItem: FC<Props> = ({ fav, groups, moveFavorite, removeFavorite }) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{fav.itemId}</span>
      <select
        value={fav.groupId || ''}
        onChange={e => moveFavorite(fav.id, e.target.value)}
        className="border px-1 py-0.5"
      >
        {groups.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <button onClick={() => removeFavorite(fav.id)} className="px-1 text-red-600">×</button>
    </div>
  );
};
