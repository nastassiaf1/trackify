import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { CheckCircle, Edit, Archive, Height } from '@mui/icons-material';
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
        height: '320px',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h6">{habit.title}</Typography>
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
