import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, FormControlLabel, Grid, Switch } from '@mui/material';
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { Habit, HabitStatusPayload } from 'src/api/interfaces';
import HabitCardColumn from './habit-card-column';
import { useHabitsApi } from 'src/api/habits-api';
import { useNotification } from 'src/context/notification-context';
import { queryClient } from 'src/api/queryClient';
import { HabitStatus } from 'src/api/constants';

interface HabitCardContainerProps {
  habits: Habit[];
}

const HabitCardContainer = ({ habits }: HabitCardContainerProps) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [dragSource, setDragSource] = useState<HabitStatus | null>(null);
  const habitApi = useHabitsApi();
  const { showNotification } = useNotification();

  const activeHabits = habits.filter((h) => !h.isArchived && !h.isCompleted);
  const archivedHabits = habits.filter((h) => h.isArchived);
  const completedHabits = habits.filter((h) => h.isCompleted);

  const { mutate: updateStatusMutate, isPending: updateStatusPending } =
    useMutation<void, Error, HabitStatusPayload>({
      mutationFn: ({ habitId, status }: HabitStatusPayload) =>
        habitApi.updateStatus({ habitId, status }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [habitApi.queryKey] });
      },
      onError: () => {
        showNotification('Failed to archive habit', 'error');
      },
    });

  const onDragStart = (start: DragStart) => {
    setDragSource(start.source.droppableId as HabitStatus);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === HabitStatus.ARCHIVED) {
      return;
    }

    const habitId = parseInt(draggableId);

    if (to === HabitStatus.ARCHIVED) {
      updateStatusMutate({ habitId, status: HabitStatus.ARCHIVED });
    } else if (to === HabitStatus.COMPLETED) {
      updateStatusMutate({ habitId, status: HabitStatus.COMPLETED });
    } else if (to === HabitStatus.ACTIVE) {
      updateStatusMutate({ habitId, status: HabitStatus.ACTIVE });
    }
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={showCompleted}
            onChange={() => setShowCompleted((prev) => !prev)}
          />
        }
        label="Show Completed"
        sx={{ mb: 2 }}
      />

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Grid container spacing={2} width="100vw">
          <Grid item xs={12} md={showCompleted ? 4 : 12}>
            <HabitCardColumn
              title={HabitStatus.ACTIVE}
              habits={activeHabits}
              droppableId={HabitStatus.ACTIVE}
              dragSourceId={dragSource}
              fullWidth={!showCompleted}
            />
          </Grid>
          {showCompleted && (
            <>
              <Grid item xs={12} md={4}>
                <HabitCardColumn
                  title={HabitStatus.COMPLETED}
                  habits={completedHabits}
                  droppableId={HabitStatus.COMPLETED}
                  dragSourceId={dragSource}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <HabitCardColumn
                  title={HabitStatus.ARCHIVED}
                  habits={archivedHabits}
                  droppableId={HabitStatus.ARCHIVED}
                  dragSourceId={dragSource}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default HabitCardContainer;
