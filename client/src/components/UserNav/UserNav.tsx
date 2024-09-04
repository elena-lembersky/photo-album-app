import React from 'react';
import { useTheme } from '@mui/material/styles';
import { stringAvatar } from 'utils/avatarHelpers';
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

const UsersList = ({
  users = [],
  onSelectUser,
  selectedUserId,
}: UsersListProps) => {
  const theme = useTheme();

  if (users.length === 0) {
    return <Typography variant="body1">No users available</Typography>;
  }
  return (
    <List sx={{ width: '100%' }}>
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
              backgroundColor:
                user.id === selectedUserId
                  ? 'black'
                  : theme.palette.primary.main,
              color: theme.palette.secondary.main,
              minHeight: '50px',
              width: 'calc(25% - 4px)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(`${user?.name}`)} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  {user?.name}:
                  <br />
                  <small>
                    {user?.albumCount
                      ? `${user?.albumCount} albums`
                      : 'no albums yet'}
                  </small>
                </>
              }
            />
          </ListItem>
        ))}
      </Box>
    </List>
  );
};

export default UsersList;
