import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { CheckCircle, Edit, Archive } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';

import { ColorVariant, Habit } from 'src/api/interfaces';
import { useHabitsApi } from 'src/api/habits-api';
import { cardColors } from 'src/api/constants';
import { queryClient } from 'src/api/queryClient';
import { useNotification } from 'src/context/notification-context';

import ColorSelector from './color-selector';

interface HabitCardProps {
  habit: Habit;
  fullWidth: boolean;
  disabled: boolean;
}

const HabitCard = ({ habit, fullWidth, disabled }: HabitCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const habitApi = useHabitsApi();
  const { showNotification } = useNotification();

  const { mutate: updaeColor } = useMutation<void, Error, ColorVariant>({
    mutationFn: (color: ColorVariant) =>
      habitApi.updateHabit(habit.id, { color }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
    },
    onError: () => {
      showNotification('Failed to archive habit', 'error');
    },
  });

  const isCompletedToday = habit.completedDates.includes(
    new Date().toISOString().split('T')[0],
  );

  return (
    <Card
      sx={{
        height: '320px',
        borderLeft: isCompletedToday
          ? '6px solid green'
          : '6px solid transparent',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer',
        },
        overflow: 'hidden',
        backgroundColor: disabled
          ? '#fff'
          : cardColors[habit.color || 'variant1'],
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">{habit.title}</Typography>
          {!habit.isArchived && !habit.isCompleted && (
            <ColorSelector
              selectedColor={habit.color || 'variant1'}
              onSelect={(color) => updaeColor(color)}
            />
          )}
        </Box>
        {habit.description && (
          <Tooltip
            title={habit.description}
            componentsProps={{
              tooltip: {
                sx: {
                  padding: '18px',
                  width: '320px',
                  backgroundColor: '#fff',
                  color: '#000',
                  boxShadow: 2,
                  fontSize: '0.875rem',
                },
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                height: '124px',
                wordBreak: 'break-word',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                '-webkit-line-clamp': '6',
                '-webkit-box-orient': 'vertical',
              }}
            >
              <span>{habit.description}</span>
            </Typography>
          </Tooltip>
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
            <IconButton onClick={() => setIsEditing(true)}>
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
