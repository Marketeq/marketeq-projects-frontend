import React from 'react';

type Favorite = {
  metadata: {
    title: string;
  };
};

type Group = {
  name: string;
  favorites: Favorite[];
};

type Props = {
  groups: Group[];
};

export default function FavoritesGroupsGrid({ groups }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {groups.map((group) => (
        <div
          key={group.name}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>{group.name}</h3>
          <ul>
            {group.favorites.map((item, index) => (
              <li key={index}>{item.metadata.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}