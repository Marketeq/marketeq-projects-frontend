import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

type Group = {
  name: string;
  favorites: {
    metadata: {
      title: string;
    };
  }[];
};

export function useFavorites(searchTerm: string) {
  const { data: groups = [] } = useSWR<Group[]>('/api/favorites/groups', fetcher);

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