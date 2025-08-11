import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { FavoriteGroup } from '@/types/favorites';

export function useFavorites(searchTerm: string) {
  const { data: groups = [] } = useSWR<FavoriteGroup[]>('/api/favorites/groups', fetcher);

  const filteredGroups = groups
    .map(group => ({
      ...group,
      favorites: group.favorites.filter(item =>
        item.metadata.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.favorites.length > 0
    );

  return { groups: filteredGroups };
}