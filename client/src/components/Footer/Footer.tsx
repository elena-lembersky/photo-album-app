import React from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from './Footer.styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Typography variant="body2">
        © 2023 Photo Gallery. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
