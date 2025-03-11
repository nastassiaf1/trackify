import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from './../context/auth-context';
import { useNotification } from './../context/notification-context';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, login, glogin } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    if (isLogin) {
      await login
        .mutateAsync({ email, password })
        .catch((err) => showNotification(err.message, 'error'));
    } else {
      await register
        .mutateAsync({ email, password })
        .catch((err) => showNotification(err.message, 'error'));
    }

    resetForm();
    onClose();
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            autoFocus
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={glogin}>
            Sign in with Google
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Typography variant="body2">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Button color="primary" onClick={() => handleSwitchMode()}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
