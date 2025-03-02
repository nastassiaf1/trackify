import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItemButton>
          <ListItemButton component={Link} to="/contacts">
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navigation;
