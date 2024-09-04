import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import UserManager from 'components/UserManager';
import GalleryManager from 'components/GalleryManager';

const UserCabinet: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Typography variant="h1" gutterBottom sx={{ p: 10 }}>
        My Cabinet
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="cabinet tabs"
        >
          <Tab label="Users Manager" />
          <Tab label="Gallery Manager" />
        </Tabs>
      </Box>
      {tabIndex === 0 ? <UserManager /> : <GalleryManager />}
    </Container>
  );
};

export default UserCabinet;
