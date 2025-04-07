import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HabitForm from './habit-form';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddHabitDialog = ({ open, onClose, onSuccess }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'orange',
        }}
      >
        Add New Habit
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <HabitForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
