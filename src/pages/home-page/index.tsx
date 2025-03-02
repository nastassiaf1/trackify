import { Box, Button, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          'url(https://source.unsplash.com/1600x900/?motivation)',
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
          marginBottom: 2,
          fontSize: '3rem',
          color: 'primary.main',
        }}
      >
        Welcome to Habit Tracker
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4, color: 'text.primary' }}>
        Track your habits, stay motivated, and build your future success!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ padding: '10px 30px', fontSize: '1rem' }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
