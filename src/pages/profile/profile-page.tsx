import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from 'src/api/api';
import { Container, Typography, Avatar, CircularProgress } from '@mui/material';
import { useAuth } from 'src/context/auth-context';

const ProfilePage = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const isOwnProfile = !userId || user?.id === Number(userId);

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
    enabled: !isOwnProfile,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">User not found</Typography>;

  const displayedUser = isOwnProfile ? user : profile;

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Avatar
        src={displayedUser.avatar}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      />
      <Typography variant="h4" fontWeight="bold" my={2}>
        {displayedUser.displayName || displayedUser.email}
      </Typography>
      <Typography color="text.secondary">{displayedUser.email}</Typography>
      <Typography sx={{ mt: 2 }}>
        Role: <strong>{displayedUser.role}</strong>
      </Typography>
    </Container>
  );
};

export default ProfilePage;
