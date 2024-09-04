import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import UsersList from '../../components/UserNav';
import AlbumsList from '../../components/AlbumList';
import { useUsers } from 'api/usersApi';
import { useAlbums } from 'api/albumsApi';
import { User } from 'types/users.types';

const MainPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    data: users = [],
    error: usersError,
    isLoading: usersLoading,
  } = useUsers();

  const {
    data: albums = [],
    error: albumsError,
    isLoading: albumsLoading,
  } = useAlbums(selectedUser?.id || '');

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  const handleSelectUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  if (usersError || albumsError) {
    return <div>Error: {usersError?.message || albumsError?.message}</div>;
  }

  return (
    <>
      <Container
        sx={{
          minHeight: '100vh',
        }}
      >
        <Typography
          variant="h1"
          sx={{ marginY: 2, minHeight: '200px', padding: '40px 0' }}
        >
          The Best Moments in Frame!
        </Typography>
        {usersLoading ? (
          <Typography>Loading users...</Typography>
        ) : (
          <UsersList
            users={users}
            selectedUserId={selectedUser?.id}
            onSelectUser={handleSelectUser}
          />
        )}
        {albumsLoading ? (
          <Typography>Loading albums...</Typography>
        ) : (
          <AlbumsList albums={albums} />
        )}
      </Container>
    </>
  );
};

export default MainPage;
