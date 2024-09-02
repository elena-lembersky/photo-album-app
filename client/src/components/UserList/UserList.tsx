import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useUsers } from 'api/usersApi';
import { User } from 'types/users.types';

interface UserListProps {
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onEditUser, onDeleteUser }) => {
  const { data: users = [], isLoading, isError } = useUsers();
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <Box>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEditUser(user)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteUser(user.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
