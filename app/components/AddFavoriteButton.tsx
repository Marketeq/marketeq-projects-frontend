import { Button } from '@mantine/core';
import { addFavorite } from '@/api/favoritesApi';
import { showNotification } from '@mantine/notifications';

interface Props {
  groupId: string;
  metadata: {
    title: string;
    [key: string]: any;
  };
  onSuccess: () => void;
}

export const AddFavoriteButton = ({ groupId, metadata, onSuccess }: Props) => {
  const handleClick = async () => {
    try {
      await addFavorite(groupId, metadata);
      showNotification({ message: 'Added to favorites', color: 'green' });
      onSuccess();
    } catch {
      showNotification({ message: 'Failed to add favorite', color: 'red' });
    }
  };

  return <Button onClick={handleClick}>⭐ Add to Favorites</Button>;
};