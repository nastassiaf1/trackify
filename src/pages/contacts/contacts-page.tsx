import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Email,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useContactApi } from 'src/api/contact-api';
import { useNotification } from 'src/context/notification-context';

const ContactsPage = () => {
  const { sendMessage } = useContactApi();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      showNotification('Message sent successfully!');

      setFormData({ name: '', email: '', message: '' });
    },
    onError: (err) => {
      showNotification(err.message, 'error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          Have questions? Need support? Feel free to reach out to us!
        </Typography>
      </motion.div>

      <Grid container spacing={4} mt={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={4} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Send us a message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Email color="primary" />
              <Typography variant="body1">support@trackify.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Phone color="primary" />
              <Typography variant="body1">+375 (29) 132-10-81</Typography>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" fontWeight="bold">
                Follow us
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} mt={1}>
                <IconButton color="primary">
                  <Facebook fontSize="large" />
                </IconButton>
                <IconButton color="primary">
                  <Instagram fontSize="large" />
                </IconButton>
                <IconButton color="primary">
                  <Twitter fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactsPage;
