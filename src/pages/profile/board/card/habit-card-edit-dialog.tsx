import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Habit } from 'src/api/interfaces';

interface HabitCardEditModalProps {
  open: boolean;
  onClose: () => void;
  habitData: Habit;
}

const HabitCardEditModal = ({
  open,
  onClose,
  habitData,
}: HabitCardEditModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Change your Habit
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}></Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HabitCardEditModal;
