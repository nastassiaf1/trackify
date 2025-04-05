import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import AuthModal from 'src/components/auth-modal';
import { navigationHeight } from 'src/components/constants';

const HomePage = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const displayName = user?.displayName;
  const transformedUserName =
    displayName && displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(images/leaves.png)',
        backgroundSize: 'auto 54vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left calc(100% + 26px)',
        minHeight: `calc(100vh - ${navigationHeight})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
        textAlign: 'end',
        color: 'white',
        paddingX: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: { xs: 4, sm: 6 },
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          color: '#67bb8f',
        }}
      >
        Welcome to Habit Tracker
        <br />
        {transformedUserName}
      </Typography>
      {user ? (
        <Button
          variant="contained"
          color="warning"
          sx={{
            padding: { xs: '8px 20px', sm: '12px 40px' },
            fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.25rem' },
          }}
          component={Link}
          to={`/profile/${user.id}/board`}
        >
          View My Habits
        </Button>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{ marginBottom: { xs: 2, sm: 4 }, color: 'text.primary' }}
          >
            Track your habits, stay motivated, and build your future success!
          </Typography>

          <Button
            variant="contained"
            color="warning"
            sx={{
              padding: { xs: '8px 20px', sm: '12px 40px' },
              fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.25rem' },
            }}
            onClick={() => setAuthModalOpen(true)}
          >
            Get Started
          </Button>
        </>
      )}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </Box>
  );
};

export default HomePage;
