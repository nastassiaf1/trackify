import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Box,
  IconButton,
  TextField,
} from '@mui/material';
import { Edit, Star } from '@mui/icons-material';

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
    // to remove && user
    enabled: !isOwnProfile && !!user,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: {
      displayName: string;
      avatar: string;
    }) => {
      const res = await axiosInstance.patch(`/users/${user?.id}`, updatedData);

      return res.data;
    },
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target?.value,
    }));
  };

  const handleSave = () => {
    mutation.mutate(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={isEditing ? formData.avatar : displayedUser.avatar}
          sx={{ width: 100, height: 100, margin: 'auto' }}
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
              sx={{ width: 80, height: 80, margin: 'auto' }}
            />
            <Typography variant="caption" color="text.secondary">
              Avatar preview
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={mutation.isPending}
              sx={{ mr: 2 }}
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
          <Typography variant="h4" fontWeight="bold" my={2}>
            {displayedUser.displayName || displayedUser.email}
          </Typography>
          <Typography color="text.secondary">{displayedUser.email}</Typography>
          <Typography sx={{ mt: 2 }}>
            Role: <strong>{displayedUser.role}</strong>
          </Typography>

          {isOwnProfile && (
            <Button
              variant="outlined"
              sx={{
                margin: 2,
                width: '240px',
                borderRadius: 3,
                padding: '8px 20px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: 'text.title',
              }}
              component={Link}
              to="./board"
            >
              <Star sx={{ marginRight: '12px', color: 'gold', fontSize: 24 }} />
              Your Board
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
