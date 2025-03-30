import { useState } from 'react';
import { Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useNotification } from 'src/context/notification-context';
import { useHabitsApi } from 'src/api/habits-api';
import AddHabitDialog from './add-habit-dialog';
import HabitCardContainer from './habit-card-container';

const HabitBoard = () => {
  const { showNotification } = useNotification();
  const habitApi = useHabitsApi();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: habits,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () =>
      habitApi.getHabits().catch((err) => {
        showNotification(err.message, 'error');
        navigate('/404');
      }),
    queryKey: [habitApi.queryKey],
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        gap={4}
        mb={12}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'text.title',
            letterSpacing: 1,
            textAlign: 'center',
          }}
        >
          My Habits
        </Typography>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setOpenDialog(true)}
          sx={{ fontWeight: 'bold', borderRadius: '8px' }}
        >
          + Add New Habit
        </Button>
      </Box>
      <Grid container spacing={3}>
        {habits?.length ? (
          <HabitCardContainer habits={habits} />
        ) : (
          <Typography
            variant="body1"
            mt={2}
            sx={{
              width: '100%',
              fontSize: '2em',
              letterSpacing: '1.6px',
              textAlign: 'center',
            }}
          >
            There are no active habits
          </Typography>
        )}
      </Grid>
      <AddHabitDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={() => {
          refetch();
          setOpenDialog(false);
        }}
      />
    </Box>
  );
};

export default HabitBoard;
