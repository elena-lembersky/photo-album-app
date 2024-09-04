import React from 'react';
import UserManager from 'components/UserManager';
import GalleryManager from 'components/GalleryManager';
import { Typography, Container } from '@mui/material';
const UserCabinet = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom sx={{ p: 10 }}>
        My Cabinet
      </Typography>
      <UserManager />
      <GalleryManager />
    </Container>
  );
};

export default UserCabinet;
