import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, FormControlLabel, Grid, Switch } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Habit, HabitStatusPayload } from 'src/api/interfaces';
import { useHabitsApi } from 'src/api/habits-api';
import { useNotification } from 'src/context/notification-context';
import { queryClient } from 'src/api/queryClient';
import { HabitStatus } from 'src/api/constants';
import HabitCardColumn from './habit-card-column';

interface HabitCardContainerProps {
  habits: Habit[];
}

const HabitCardContainer = ({ habits }: HabitCardContainerProps) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const habitApi = useHabitsApi();
  const { showNotification } = useNotification();

  const activeHabits = habits.filter((h) => !h.isArchived && !h.isCompleted);
  const completedHabits = habits.filter((h) => h.isCompleted);

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const to = destination.droppableId;

    const habitId = parseInt(draggableId);

    if (to === HabitStatus.COMPLETED) {
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} width="100vw">
          <Grid item xs={12} md={showCompleted ? 6 : 12}>
            <HabitCardColumn
              title={HabitStatus.ACTIVE}
              habits={activeHabits}
              droppableId={HabitStatus.ACTIVE}
            />
          </Grid>
          {showCompleted && (
            <>
              <Grid item xs={12} md={6}>
                <HabitCardColumn
                  title={HabitStatus.COMPLETED}
                  habits={completedHabits}
                  droppableId={HabitStatus.COMPLETED}
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
