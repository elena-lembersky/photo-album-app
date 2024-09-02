import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HeaderProps } from './Header.types';
import Logo from '../Logo';

const Header = ({ title, onButtonClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    navigate('/my-cabinet');
  };
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Logo
              onClick={() => {
                navigate('/');
              }}
              title="Elementor"
            />
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          <Button color="inherit" onClick={handleButtonClick}>
            My Cabinet
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
