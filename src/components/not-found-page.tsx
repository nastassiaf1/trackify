import { Container, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">Not Found</Typography>
    </Container>
  );
};

export default NotFoundPage;
