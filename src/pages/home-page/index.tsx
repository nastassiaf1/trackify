import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/auth-context';

const HomePage = () => {
  const { user } = useAuth();

  const displayName = user?.displayName;
  const transformedUserName =
    displayName && displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(images/leaves.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: { xs: 1, sm: 2 },
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          color: 'text.black',
        }}
      >
        Welcome to Habit Tracker {transformedUserName}
      </Typography>
      {user ? (
        <>
          <Typography
            variant="h5"
            sx={{ marginBottom: { xs: 2, sm: 4 }, color: 'text.primary' }}
          >
            Let&apos;s take a look at your habits!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: { xs: '8px 20px', sm: '12px 40px' },
              fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.25rem' },
            }}
          >
            View My Habits
          </Button>
        </>
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
            color="primary"
            sx={{
              padding: { xs: '8px 20px', sm: '12px 40px' },
              fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.25rem' },
            }}
          >
            Get Started
          </Button>
        </>
      )}
    </Box>
  );
};

export default HomePage;
