import { useState } from 'react';
import { Box, FormControlLabel, Grid, Switch } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Habit } from 'src/api/interfaces';
import HabitCardColumn from './habit-card-column';
import { CardStatus } from './constants';

interface HabitCardContainerProps {
  habits: Habit[];
}

const HabitCardContainer = ({ habits }: HabitCardContainerProps) => {
  const [showCompleted, setShowCompleted] = useState(false);

  const activeHabits = habits.filter((h) => !h.isArchived && !h.isCompleted);
  const archivedHabits = habits.filter((h) => h.isArchived);
  const completedHabits = habits.filter((h) => h.isCompleted);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
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
          <Grid item xs={12} md={showCompleted ? 4 : 12}>
            <HabitCardColumn
              title={CardStatus.ACTIVE}
              habits={activeHabits}
              droppableId={CardStatus.ACTIVE}
              fullWidth={!showCompleted}
            />
          </Grid>
          {showCompleted && (
            <>
              <Grid item xs={12} md={4}>
                <HabitCardColumn
                  title={CardStatus.COMPLETED}
                  habits={completedHabits}
                  droppableId={CardStatus.COMPLETED}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <HabitCardColumn
                  title={CardStatus.ARCHIVED}
                  habits={archivedHabits}
                  droppableId={CardStatus.ARCHIVED}
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
