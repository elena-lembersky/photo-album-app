import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useUsers } from 'api/usersApi';
import { User } from 'types/users.types';

interface UserListProps {
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onCreateUser: () => void;
}

const UserList: React.FC<UserListProps> = ({
  onCreateUser,
  onEditUser,
  onDeleteUser,
}) => {
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
                  onClick={() => onDeleteUser(user)}
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
      <IconButton edge="end" aria-label="edit" onClick={() => onCreateUser()}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default UserList;
