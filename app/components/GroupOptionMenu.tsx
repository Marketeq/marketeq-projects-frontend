import { Menu, Button, Modal, TextInput } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { renameGroup, deleteGroup } from '@/api/favoritesApi';
import { showNotification } from '@mantine/notifications';

interface Props {
  groupId: string;
  groupName: string;
  onRefresh: () => void;
}

export const GroupOptionMenu = ({ groupId, groupName, onRefresh }: Props) => {
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [newName, setNewName] = useState(groupName);

  const handleRename = async () => {
    try {
      await renameGroup(groupId, newName);
      showNotification({ message: 'Group renamed', color: 'green' });
      onRefresh();
      setRenameModalOpen(false);
    } catch (err) {
      showNotification({ message: 'Rename failed', color: 'red' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(groupId);
      showNotification({ message: 'Group deleted', color: 'green' });
      onRefresh();
    } catch (err) {
      showNotification({ message: 'Delete failed', color: 'red' });
    }
  };

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="subtle" color="gray" p={0}>
            <IconDots size={18} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => setRenameModalOpen(true)}>
            <IconPencil size={14} style={{ marginRight: 8 }} />
            Rename Group
          </Menu.Item>
          <Menu.Item color="red" onClick={handleDelete}>
            <IconTrash size={14} style={{ marginRight: 8 }} />
            Delete Group
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal opened={renameModalOpen} onClose={() => setRenameModalOpen(false)} title="Rename Group">
        <TextInput
          label="New Name"
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
        <Button mt="md" onClick={handleRename}>Save</Button>
      </Modal>
    </>
  );
};