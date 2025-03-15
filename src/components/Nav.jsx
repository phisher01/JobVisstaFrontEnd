import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Get Hired!
        </Typography>
        <Box>
          <Button color="inherit">Features</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Button color="inherit">Login</Button>
          <Button variant="outlined" color="inherit" sx={{ ml: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
