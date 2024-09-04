import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useUsers } from 'api/usersApi';
import { User } from 'types/users.types';

interface UserListProps {
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onCreateUser: () => void;
}

const UserEditList: React.FC<UserListProps> = ({
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
        {users?.map((user, index) => (
          <React.Fragment key={user.id}>
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
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ textAlign: 'right', p: 5 }}>
        <IconButton
          edge="end"
          aria-label="add"
          onClick={onCreateUser}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            right: 5,
            '&:hover': {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserEditList;
