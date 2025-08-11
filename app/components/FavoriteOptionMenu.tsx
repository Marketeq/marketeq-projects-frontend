import { Menu, Button, Select } from '@mantine/core';
import { IconDots, IconTrash, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { moveFavorite, removeFavorite } from '@/api/favoritesApi';
import { showNotification } from '@mantine/notifications';

interface Props {
  favoriteId: string;
  currentGroup: string;
  allGroups: { name: string }[];
  onRefresh: () => void;
}

export const FavoriteOptionMenu = ({ favoriteId, currentGroup, allGroups, onRefresh }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleMove = async () => {
    if (!selectedGroup || selectedGroup === currentGroup) return;

    try {
      await moveFavorite(favoriteId, selectedGroup);
      showNotification({ message: 'Moved to new group', color: 'green' });
      onRefresh();
    } catch {
      showNotification({ message: 'Failed to move', color: 'red' });
    }
  };

  const handleRemove = async () => {
    try {
      await removeFavorite(favoriteId);
      showNotification({ message: 'Removed from favorites', color: 'green' });
      onRefresh();
    } catch {
      showNotification({ message: 'Failed to remove', color: 'red' });
    }
  };

  return (
    <Menu shadow="md" width={220}>
      <Menu.Target>
        <Button variant="subtle" color="gray" p={0}>
          <IconDots size={18} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Move to Group</Menu.Label>
        <Select
          data={allGroups.map((g) => g.name)}
          value={selectedGroup || currentGroup}
          onChange={setSelectedGroup}
          onDropdownClose={handleMove}
          allowDeselect={false}
        />
        <Menu.Divider />
        <Menu.Item color="red" onClick={handleRemove}>
          <IconTrash size={14} style={{ marginRight: 8 }} />
          Remove from Favorites
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};