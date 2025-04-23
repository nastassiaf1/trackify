import { Button, Container, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 14 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        color="text.title"
      >
        404
      </Typography>
      <Typography variant="h3" color="text.title">
        Not Found
      </Typography>

      <Button variant="text" component="a" href="/" sx={{ mt: 4 }}>
        Go to Home Page
      </Button>
    </Container>
  );
};

export default NotFoundPage;
