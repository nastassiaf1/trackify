import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material';
import Calendar from 'react-calendar';
import { format, isBefore } from 'date-fns';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useHabitsApi } from 'src/api/habits-api';
import { queryClient } from 'src/api/queryClient';
import { HabitDayPayload } from 'src/api/interfaces';
import { HabitStatus, TrackStatus } from 'src/api/constants';

import 'react-calendar/dist/Calendar.css';
import './habit-detail-calendar.css';

import { generateKeyDates, getNextPlannedDate } from '../helpers';
import BoxTrackLine from './box-track-line';

const HabitDetailPage = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const { habitId: habitIdParam } = useParams<{ habitId: string }>();
  const habitApi = useHabitsApi();
  const theme = useTheme();

  const habitId = Number(habitIdParam);

  const { data: habit, isLoading } = useQuery({
    queryKey: ['habit', habitId],
    queryFn: () => habitApi.getHabitById({ habitId: habitId }),
  });

  const markCompletedMutation = useMutation({
    mutationFn: (dayData: HabitDayPayload) => habitApi.markDayAsDone(dayData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit', habitId] });
      queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
    },
  });

  if (isLoading || !habit) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  const keyDays = generateKeyDates(habit);
  const nextKeyDay = getNextPlannedDate(habit, keyDays);

  const createdAtDate = new Date(habit.createdAt);

  const completedDates = habit.completedDates.map((d) =>
    format(new Date(d), 'yyyy-MM-dd'),
  );
  const today = format(new Date(), 'yyyy-MM-dd');

  const isTodayCompleted = completedDates.includes(today);

  const goToToday = () => {
    const date = new Date();

    setCurrentDate(date);
    setActiveStartDate(date);
  };

  return (
    <Box
      p={4}
      maxWidth="900px"
      margin="0 auto"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {habit.title}
        </Typography>

        {habit.description && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            mb={3}
            sx={{ fontSize: '1rem', lineHeight: 1.6 }}
          >
            {habit.description}
          </Typography>
        )}

        <Typography
          variant="subtitle1"
          color="text.primary"
          mb={3}
          sx={{ fontSize: '1rem', lineHeight: 1.6 }}
        >
          Status:{' '}
          <Typography
            component="span"
            color={habit.isCompleted ? '#008000cc' : '#c45024f2'}
          >
            {habit.isCompleted ? HabitStatus.COMPLETED : HabitStatus.ACTIVE}
          </Typography>
        </Typography>

        <Box display="flex" justifyContent="end">
          <Button
            size="small"
            sx={{ padding: 1 }}
            variant="text"
            onClick={goToToday}
          >
            Go to Today
          </Button>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            '& .react-calendar': {
              border: 'none',
              width: '100%',
              maxWidth: '700px',
              fontSize: '1.2rem',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '12px',
              boxShadow: theme.shadows[1],
              padding: '20px',
            },
            '& .react-calendar__month-view__days': {
              display: 'grid !important',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '2px',
            },
            '& .react-calendar__tile': {
              borderRadius: '8px',
            },
            '& .react-calendar__tile--now': {
              color: '#000',
              fontWeight: '900',
              '&:hover': {
                backgroundColor: 'rgba(158, 157, 159, 0.27)',
              },
            },
            '& .react-calendar__tile--active': {
              backgroundColor: '#718effc2 !important',
              color: theme.palette.primary.contrastText,
            },
            '& .highlight': {
              backgroundColor: '#a5d6a7',
              borderRadius: '8px',
              color: '#000',
            },
          }}
        >
          <Calendar
            inputRef={calendarRef}
            value={currentDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => {
              if (activeStartDate) {
                setActiveStartDate(activeStartDate);
              }
            }}
            onClickDay={(value) => setCurrentDate(value)}
            tileClassName={({ date }) => {
              const dateStr = format(date, 'yyyy-MM-dd');

              if (isBefore(date, createdAtDate)) return '';

              if (
                !keyDays.includes(dateStr) &&
                completedDates.includes(dateStr)
              )
                return 'over-day';

              if (nextKeyDay === dateStr && !habit.isCompleted)
                return 'next-day';

              if (completedDates.includes(dateStr)) return 'completed-day';

              if (keyDays.includes(dateStr)) return 'expected-day';

              if (isBefore(date, new Date()) && !keyDays.includes(dateStr))
                return 'gray-day';

              return '';
            }}
            tileContent={({ date, view }) => {
              if (view !== 'month') return null;

              const dateStr = format(date, 'yyyy-MM-dd');
              const isCompleted = completedDates.includes(dateStr);
              const isExpected = keyDays.includes(dateStr);
              const isBeforeToday = isBefore(date, new Date());
              const isToday = format(date, 'yyyy-MM-dd') === today;
              const isRemoved = habit.isCompleted;
              const isCreatedDate =
                format(date, 'yyyy-MM-dd') ===
                format(createdAtDate, 'yyyy-MM-dd');
              const isNextDay = nextKeyDay === dateStr;

              return (
                <Box
                  sx={{
                    position: 'relative',
                    '&:hover .hover-button': {
                      opacity: 1,
                    },
                  }}
                >
                  {(isCreatedDate || isNextDay) && !isRemoved && (
                    <Tooltip
                      title={
                        isCreatedDate
                          ? 'Started on this day'
                          : isNextDay && today === nextKeyDay
                            ? "Don't miss today!"
                            : 'Next Planned Day'
                      }
                    >
                      <StarIcon
                        sx={{
                          position: 'absolute',
                          top: '-30px',
                          right: '70px',
                          fontSize: '1rem',
                          color: 'gold',
                        }}
                      />
                    </Tooltip>
                  )}

                  {isExpected && isCompleted && (
                    <BoxTrackLine status={TrackStatus.DONE} />
                  )}

                  {isExpected && (isBeforeToday || isToday) && !isCompleted && (
                    <BoxTrackLine status={TrackStatus.MISSED} />
                  )}

                  {!isExpected && isCompleted && (
                    <BoxTrackLine status={TrackStatus.OVERACHIVED} />
                  )}

                  {!isRemoved && (
                    <Tooltip
                      title={isCompleted ? 'Unmark as done' : 'Mark as done'}
                    >
                      <IconButton
                        className="hover-button"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: '-12px',
                          right: 6,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          padding: 0,
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();

                          markCompletedMutation.mutate({
                            habitId,
                            date: dateStr,
                            completed: !isCompleted,
                          });
                        }}
                      >
                        {isCompleted ? (
                          <HighlightOffIcon
                            sx={{ color: '#c45024f2' }}
                            fontSize="small"
                          />
                        ) : (
                          <CheckCircleOutlineIcon
                            sx={{ color: '#008000cc' }}
                            fontSize="small"
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            }}
            minDate={new Date('2025-01-01')}
          />
        </Box>

        {!habit.isCompleted && (
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircleOutlineIcon />}
              disabled={isTodayCompleted || markCompletedMutation.isPending}
              onClick={() =>
                markCompletedMutation.mutate({
                  habitId,
                  date: today,
                  completed: true,
                })
              }
            >
              {isTodayCompleted
                ? 'Already marked today'
                : `${today === nextKeyDay ? 'Today - is a key day! ' : ''}Mark Today as Done`}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default HabitDetailPage;
