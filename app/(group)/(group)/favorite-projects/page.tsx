'use client';

import { useState } from 'react';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useFavorites } from '../../../hooks/useFavorites';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useMatchFavorites } from '@/hooks/useMatchFavorites';
import { GroupOptionMenu } from '@/components/GroupOptionMenu';
import { FavoriteOptionMenu } from '@/components/FavoriteOptionMenu';
import { FavoriteGroup } from '@/types/favorites';
import { AddFavoriteButton } from '@/components/AddFavoriteButton';

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm, 150);
  const { groups } = useFavorites(debouncedSearch);
  const { user, isLoading: isUserLoading } = useAuthUser();

  const [aiInput, setAiInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('General');
  const { runMatch, matches, isLoading: isMatching, error } = useMatchFavorites();

  return (
    <div>
      {isUserLoading ? (
        <p>Loading user...</p>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <p>Welcome, {user?.name} ({user?.email})</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
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
          }}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} style={{ marginLeft: '0.5rem' }}>
            ×
          </button>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Describe what you're looking for..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            marginRight: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '1rem',
            borderRadius: '4px',
          }}
        >
          {groups.map((group) => (
            <option key={group.name} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
        <button onClick={() => runMatch(aiInput, selectedGroup)} disabled={isMatching}>
          {isMatching ? 'Matching...' : 'Match with AI'}
        </button>
      </div>

      {matches.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h4>AI Matches</h4>
          <ul>
            {matches.map((fav) => (
              <li
                key={fav.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{fav.metadata.title}</span>
                <AddFavoriteButton
                  groupId={selectedGroup}
                  metadata={fav.metadata}
                  onSuccess={() => window.location.reload()}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <AddFavoriteButton
          groupId="General"
          metadata={{ title: 'Test Project', description: 'This was added via UI' }}
          onSuccess={() => window.location.reload()}
        />
      </div>

      {groups.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          No favorites match ‘{debouncedSearch}’. <button onClick={() => setSearchTerm('')}>Clear search</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {groups.map((group: FavoriteGroup) => (
            <div key={group.name} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{group.name}</h3>
                <GroupOptionMenu
                  groupId={group.name}
                  groupName={group.name}
                  onRefresh={() => window.location.reload()}
                />
              </div>
              <div style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
                {group.favorites.map((fav) => (
                  <div key={fav.metadata.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div>{fav.metadata.title}</div>
                    <FavoriteOptionMenu
                      favoriteId={fav.id}
                      currentGroup={group.name}
                      allGroups={groups}
                      onRefresh={() => window.location.reload()}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}