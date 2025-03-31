import { Typography, Paper, Card } from '@mui/material';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Habit } from 'src/api/interfaces';
import HabitCard from './habit-card';
import { CardStatus } from './constants';

interface HabitCardColumnProps {
  title: CardStatus;
  habits: Habit[];
  droppableId: CardStatus;
  dragSourceId: CardStatus | null;
  fullWidth?: boolean;
}

const getBackgroundColor = (
  status: CardStatus,
  isDraggingOver: boolean,
): string => {
  if (status === CardStatus.ACTIVE) {
    return isDraggingOver ? 'rgba(0, 128, 0, 0.2)' : 'rgba(0, 128, 0, 0.05)';
  }

  if (status === CardStatus.COMPLETED || status === CardStatus.ARCHIVED) {
    return isDraggingOver ? 'rgba(255, 0, 0, 0.15)' : 'rgba(255, 0, 0, 0.05)';
  }

  return 'transparent';
};

const HabitCardColumn = ({
  title,
  habits,
  droppableId,
  dragSourceId = null,
  fullWidth = false,
}: HabitCardColumnProps) => {
  const isDropDisabled =
    dragSourceId === CardStatus.ARCHIVED && droppableId !== CardStatus.ARCHIVED;

  return (
    <Paper sx={{ p: 2, minHeight: '60vh' }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'semibold',
          color: title === CardStatus.ACTIVE ? 'text.title' : 'text.disabled',
        }}
      >
        {title}
      </Typography>

      <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: fullWidth
                ? 'repeat(auto-fill, minmax(280px, 1fr))'
                : '1fr',
              gap: '16px',
              transition: 'background-color 0.3s ease-in-out',
              backgroundColor: getBackgroundColor(
                title,
                snapshot.isDraggingOver,
              ),
            }}
          >
            {habits.map((habit, index) => (
              <Draggable
                key={habit.id.toString()}
                draggableId={habit.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: 8,
                    }}
                  >
                    <HabitCard habit={habit} fullWidth={fullWidth} />
                  </div>
                )}
              </Draggable>
            ))}

            {!habits.length && droppableId === CardStatus.ACTIVE && (
              <Typography
                variant="body1"
                mt={2}
                sx={{
                  width: '100%',
                  fontSize: '1em',
                  letterSpacing: '1.6px',
                  textAlign: 'center',
                }}
              >
                There are no active habits
              </Typography>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default HabitCardColumn;
