import React from 'react';
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

interface Props {
  habit: Habit;
}

const HabitCard: React.FC<Props> = ({ habit }) => {
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
      }}
    >
      <CardContent>
        <Typography variant="h6">{habit.title}</Typography>
        {habit.description && (
          <Typography variant="body2" color="text.secondary">
            {habit.description}
          </Typography>
        )}

        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
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
