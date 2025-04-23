import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Edit, Star } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { axiosInstance } from 'src/api/api';
import { useAuth } from 'src/context/auth-context';
import { queryClient } from 'src/api/queryClient';
import { useAuthApi } from 'src/api/auth-api';
import { useNotification } from 'src/context/notification-context';

const ProfilePage = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const isOwnProfile = !userId || user?.id === Number(userId);
  const authApi = useAuthApi();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    avatar: user?.avatar || '',
  });

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}`);
      return res.data;
    },
    enabled: !isOwnProfile && !!user,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: { displayName: string; avatar: string }) =>
      axiosInstance.patch(`/users/${user?.id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authApi.queryKey] });

      setIsEditing(false);
    },
    onError: (err) => {
      showNotification(err.message, 'error');
    },
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">User not found</Typography>;

  const displayedUser = isOwnProfile ? user : profile;
  if (!displayedUser) {
    navigate('/404');
    return null;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    mutation.mutate(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
          <Avatar
            src={isEditing ? formData.avatar : displayedUser.avatar}
            sx={{ width: 100, height: 100, mx: 'auto' }}
          />
          {isOwnProfile && !isEditing && (
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => {
                setFormData({
                  displayName: displayedUser.displayName || '',
                  avatar: displayedUser.avatar || '',
                });
                setIsEditing(true);
              }}
            >
              <Edit />
            </IconButton>
          )}
        </Box>

        {isEditing ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Avatar URL"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
            <Box sx={{ mt: 2 }}>
              <Avatar
                src={formData.avatar}
                sx={{ width: 80, height: 80, mx: 'auto' }}
              />
              <Typography variant="caption" color="text.secondary">
                Avatar preview
              </Typography>
            </Box>
            <Box
              sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}
            >
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={mutation.isPending}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {displayedUser.displayName || displayedUser.email}
            </Typography>
            <Typography color="text.secondary">
              {displayedUser.email}
            </Typography>

            <Chip
              label={`Role: ${displayedUser.role}`}
              color="primary"
              sx={{ mt: 2 }}
            />
            <br />
            {isOwnProfile && (
              <Button
                variant="outlined"
                sx={{
                  mt: 4,
                  width: '240px',
                  borderRadius: 3,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
                component={Link}
                to="./board"
              >
                <Star sx={{ mr: 1, color: 'gold' }} />
                Your Board
              </Button>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
