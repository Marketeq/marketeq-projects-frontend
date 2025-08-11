'use client';

import { useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useFavorites } from '@/hooks/useFavorites';

type FavoriteItem = {
  metadata: {
    title: string;
  };
};

type Group = {
  name: string;
  favorites: FavoriteItem[];
};

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm, 150);
  const { groups } = useFavorites(debouncedSearch);

  return (
    <div style={{ padding: '2rem' }}>
      <input
        placeholder="Search by skills or project type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px',
          marginBottom: '1rem',
        }}
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm('')} style={{ marginLeft: '0.5rem' }}>
          ×
        </button>
      )}

      {groups.length === 0 ? (
        <div style={{ marginTop: '2rem' }}>
          No favorites match ‘{debouncedSearch}’.{' '}
          <button onClick={() => setSearchTerm('')}>Clear search</button>
        </div>
      ) : (
        <ul>
          {groups.map((group: Group) => (
            <li key={group.name}>
              <strong>{group.name}</strong>
              <ul>
          {group.favorites.map((item: FavoriteItem, i: number) => (
            <li key={i}>{item.metadata.title}</li>
          ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}