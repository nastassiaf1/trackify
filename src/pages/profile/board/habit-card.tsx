import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { CheckCircle, Edit, Archive } from '@mui/icons-material';
import { Habit } from 'src/api/interfaces';

interface HabitCardProps {
  habit: Habit;
  fullWidth: boolean;
}

const HabitCard = ({ habit, fullWidth }: HabitCardProps) => {
  const isCompletedToday = habit.completedDates.includes(
    new Date().toISOString().split('T')[0],
  );

  return (
    <Card
      sx={{
        borderLeft: isCompletedToday
          ? '6px solid green'
          : '6px solid transparent',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer',
        },
        overflow: 'hidden',
        height: "320px",
      }}
    >
      <CardContent>
        <Typography variant="h6">{habit.title}</Typography>
        {habit.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: 'break-word' }}
          >
            {habit.description}
          </Typography>
        )}

        <Box
          mt={2}
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent="end"
        >
          <Tooltip title="Check as done">
            <IconButton color={isCompletedToday ? 'success' : 'default'}>
              <CheckCircle />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title="Archive">
            <IconButton>
              <Archive />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
