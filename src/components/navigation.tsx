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
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Google, Info, StarOutline } from '@mui/icons-material';

import { useAuth } from '../context/auth-context';
import AuthModal from './auth-modal';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout, glogin } = useAuth();
  const theme = useTheme();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ boxShadow: 3 }}>
        <Toolbar
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Button
              color="inherit"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
              component={Link}
              to="/"
            >
              TrackiFy
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: 250,
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: theme.palette.background.paper,
            borderRight: 'none',
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <List sx={{ paddingTop: 2 }}>
          <ListItemButton component={Link} to="/" sx={{ paddingY: 2 }}>
            <HomeIcon sx={{ marginRight: 2, color: 'primary.main' }} />
            <ListItemText primary="Home" />
          </ListItemButton>

          {user && (
            <ListItemButton
              component={Link}
              to={`/profile/${user.id}`}
              sx={{ paddingY: 2 }}
            >
              <AccountCircleIcon
                sx={{ marginRight: 2, color: 'primary.main' }}
              />
              <ListItemText primary="Profile" />
            </ListItemButton>
          )}

          {!user && (
            <>
              <ListItemButton
                component="button"
                onClick={() => setAuthModalOpen(true)}
                sx={{ paddingY: 2 }}
              >
                <LoginIcon sx={{ marginRight: 2, color: 'primary.main' }} />
                <ListItemText primary="Login with Password" />
              </ListItemButton>
              <ListItemButton
                component="a"
                onClick={glogin}
                sx={{ paddingY: 2 }}
              >
                <Google sx={{ marginRight: 2, color: 'primary.main' }} />
                <ListItemText primary="Login with Google" />
              </ListItemButton>
            </>
          )}

          <ListItemButton
            component={Link}
            to="/hall-of-fame"
            sx={{ paddingY: 2 }}
          >
            <StarOutline sx={{ marginRight: 2, color: 'primary.main' }} />
            <ListItemText primary="Hall of Fame" />
          </ListItemButton>

          <Divider sx={{ marginY: 2 }} />

          <ListItemButton component={Link} to="/about" sx={{ paddingY: 2 }}>
            <Info sx={{ marginRight: 2, color: 'primary.main' }} />
            <ListItemText primary="About Us" />
          </ListItemButton>

          <ListItemButton component={Link} to="/contacts" sx={{ paddingY: 2 }}>
            <ContactMailIcon sx={{ marginRight: 2, color: 'primary.main' }} />
            <ListItemText primary="Contacts" />
          </ListItemButton>

          {user && (
            <Button
              variant="outlined"
              color="error"
              sx={{
                margin: 2,
                width: '80%',
                borderRadius: 3,
                padding: '8px 20px',
              }}
              onClick={logout}
            >
              Log Out
            </Button>
          )}
        </List>
      </Drawer>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </Box>
  );
};

export default Navigation;
