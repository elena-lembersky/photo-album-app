import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import type { UsersListProps } from './UserNav.types';
import { stringAvatar } from 'utils/avatarHelpers';

const UsersList = ({
  users = [],
  onSelectUser,
  selectedUserId,
}: UsersListProps) => {
  if (users.length === 0) {
    return <Typography variant="body1">No users available</Typography>;
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {users?.map((user) => (
          <ListItem
            data-selected={user.id === selectedUserId}
            component="button"
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            sx={{
              display: 'flex',
              border: 'none',
              minWidth: '50px',
              margin: '2px',
              cursor: 'pointer',
              backgroundColor: user.id === selectedUserId ? '#FFC5F3' : 'black',
              color: user.id === selectedUserId ? 'black' : '#FFC5F3',
              minHeight: '50px',
              width: 'calc(25% - 4px)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#FFC5F3',
                color: 'black',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(`${user?.name}`)} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user?.name}:  ${user?.albumCount} albums`}
            />
          </ListItem>
        ))}
      </Box>
    </List>
  );
};

export default UsersList;
