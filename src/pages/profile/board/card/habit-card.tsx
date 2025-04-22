import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CheckCircleOutlined,
  EditOutlined,
  ArchiveOutlined,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { ColorVariant, Habit, HabitStatusPayload } from 'src/api/interfaces';
import { useHabitsApi } from 'src/api/habits-api';
import { cardColors, HabitStatus } from 'src/api/constants';
import { queryClient } from 'src/api/queryClient';
import { useNotification } from 'src/context/notification-context';

import ColorSelector from './color-selector';
import HabitCardEditOutlinedModal from './habit-card-edit-dialog';
import { generateKeyDates, getNextPlannedDate } from 'src/pages/helpers';
import { format } from 'date-fns';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const habitApi = useHabitsApi();
  const { showNotification } = useNotification();

  const { mutate: updaeColor } = useMutation<Habit, Error, ColorVariant>({
    mutationFn: (color: ColorVariant) =>
      habitApi.updateHabit(habit.id, { color }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
    },
    onError: () => {
      showNotification('Failed to archive habit', 'error');
    },
  });

  const { mutate: updateStatusMutate } = useMutation<
    void,
    Error,
    HabitStatusPayload
  >({
    mutationFn: ({ habitId, status }: HabitStatusPayload) =>
      habitApi.updateStatus({ habitId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
    },
    onError: () => {
      showNotification('Failed to archive habit', 'error');
    },
  });

  const today = format(new Date(), 'yyyy-MM-dd');
  const keyDays = generateKeyDates(habit);
  const nextKeyDay = getNextPlannedDate(habit, keyDays);
  const isCompletedToday = habit.completedDates.includes(today);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditCard = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCheckAsDone = () => {
    updateStatusMutate({
      habitId: habit.id,
      status: HabitStatus.COMPLETED,
    });

    handleCloseMenu();
  };

  const handleArchiveCard = () => {
    updateStatusMutate({
      habitId: habit.id,
      status: HabitStatus.ARCHIVED,
    });

    handleCloseMenu();
  };

  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    window.open(`/habits/${habit.id}`, '_blank');
  };

  const borderLeft = habit.isCompleted
    ? '6px solid rgba(0, 101, 252, 0.45)'
    : isCompletedToday
      ? '6px solid #00800073'
      : nextKeyDay === today
        ? '6px solid #ff4700a6'
        : '6px solid transparent';

  return (
    <Card
      sx={{
        height: '320px',
        borderLeft,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer',
        },
        overflow: 'hidden',
        backgroundColor: cardColors[habit.color || 'variant1'],
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
          <Box display={'flex'} gap={1}>
            <Typography variant="h6" onClick={handleCardClick}>
              {habit.title}
            </Typography>
            <Tooltip title="View details">
              <IconButton sx={{ marginTop: '-2px' }} onClick={handleCardClick}>
                <VisibilityOutlinedIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>

          {!habit.isArchived && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleOpenMenu}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: 200,
                    width: '200px',
                  },
                }}
              >
                <MenuItem onClick={handleCheckAsDone}>
                  <CheckCircleOutlined
                    sx={{ marginRight: 1.5, color: 'primary.main' }}
                  />
                  Check as done
                </MenuItem>
                {!habit.isCompleted && (
                  <MenuItem onClick={handleEditCard}>
                    <EditOutlined
                      sx={{ marginRight: 1.5, color: 'primary.main' }}
                    />
                    Edit
                  </MenuItem>
                )}
                <MenuItem onClick={handleArchiveCard}>
                  <ArchiveOutlined
                    sx={{ marginRight: 1.5, color: 'primary.main' }}
                  />
                  Archive
                </MenuItem>
              </Menu>
            </>
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

        {!habit.isArchived && !habit.isCompleted && (
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            gap={2}
            padding={1}
            justifyContent="end"
          >
            <ColorSelector
              selectedColor={habit.color || 'variant1'}
              onSelect={(color) => updaeColor(color)}
            />
          </Box>
        )}
      </CardContent>
      <HabitCardEditOutlinedModal
        open={openDialog}
        habit={habit}
        onClose={() => setOpenDialog(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
          setOpenDialog(false);
        }}
      />
    </Card>
  );
};

export default HabitCard;
