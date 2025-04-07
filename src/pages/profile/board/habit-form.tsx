import { useState } from 'react';
import { TextField, Button, Stack, MenuItem, Collapse } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useHabitsApi } from 'src/api/habits-api';
import { useNotification } from 'src/context/notification-context';
import { FrequencyType, Habit, HabitPayload } from 'src/api/interfaces';
import { FREQUENCY_OPTIONS } from 'src/api/constants';

interface Props {
  onSuccess?: () => void;
  habit?: Habit;
}

const HabitForm = ({ onSuccess, habit }: Props) => {
  const [title, setTitle] = useState(habit?.title || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [frequencyType, setFrequencyType] = useState<FrequencyType>(
    habit?.frequencyType || 'daily',
  );
  const [repeatEveryXDays, setRepeatEveryXDays] = useState<number | null>(
    habit?.repeatEveryXDays || null,
  );
  const habitApi = useHabitsApi();
  const { showNotification } = useNotification();

  const isNew = !habit?.id;

  const { mutate, isPending } = useMutation<Habit, Error, HabitPayload>({
    mutationFn: (data: HabitPayload) => {
      return isNew
        ? habitApi.addHabit(data)
        : habitApi.updateHabit(habit.id, data);
    },
    onError: () => {
      showNotification(`Failed to ${isNew ? 'add' : 'update'} habit`, 'error');
    },
    onSuccess: () => {
      showNotification(
        `The habit was ${isNew ? 'added' : 'updated'} to the board`,
        'success',
      );

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = async () => {
    if (
      frequencyType === 'custom' &&
      (!repeatEveryXDays || repeatEveryXDays < 1)
    ) {
      showNotification('Please enter a valid number of days', 'error');

      return;
    }

    if (!title || !description || !frequencyType) return;

    mutate({
      title,
      description,
      frequencyType,
      repeatEveryXDays: frequencyType === 'custom' ? repeatEveryXDays : null,
    });
  };

  return (
    <Stack spacing={2} mt={1} py={4} px={2}>
      <TextField
        label="Title"
        value={title}
        fullWidth
        required
        inputProps={{
          maxLength: 80,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        fullWidth
        multiline
        rows={5}
        maxRows={5}
        inputProps={{
          maxLength: 255,
        }}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        select
        label="Frequency"
        value={frequencyType}
        fullWidth
        onChange={(e) => setFrequencyType(e.target.value as FrequencyType)}
      >
        {FREQUENCY_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Collapse in={frequencyType === 'custom'}>
        <TextField
          type="number"
          label="Repeat every X days"
          value={repeatEveryXDays}
          fullWidth
          inputProps={{ min: 1 }}
          onChange={(e) => setRepeatEveryXDays(Number(e.target.value))}
          sx={{ mt: 1 }}
        />
      </Collapse>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isPending || !title}
      >
        {isNew ? 'Add' : 'Update'}
      </Button>
    </Stack>
  );
};

export default HabitForm;
