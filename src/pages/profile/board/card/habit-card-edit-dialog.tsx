import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material';
import { Habit } from 'src/api/interfaces';
import HabitForm from '../habit-form';

interface HabitCardEditModalProps {
  open: boolean;
  habit: Habit;
  onClose: () => void;
  onSuccess?: () => void;
}

const HabitCardEditModal = ({
  open,
  habit,
  onClose,
  onSuccess,
}: HabitCardEditModalProps) => {
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'orange',
        }}
      >
        Change your Habit
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <HabitForm onSuccess={onSuccess} habit={habit} />
      </DialogContent>
    </Dialog>
  );
};

export default HabitCardEditModal;
