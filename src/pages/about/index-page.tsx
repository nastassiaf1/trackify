import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

import { EmojiEvents, Star } from '@mui/icons-material';

const features = [
  {
    title: 'Develop Discipline',
    description:
      'Turn actions into habits through consistency and self-control.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
  {
    title: 'Stay Motivated',
    description:
      'Visualize your progress and celebrate milestones to keep going.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
  {
    title: 'Boost Productivity',
    description: 'Create structured routines and minimize procrastination.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
  {
    title: "Track Your Friends' Progress",
    description: 'Compete and support each other in building better habits.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
  {
    title: 'Analyze Your Growth',
    description:
      'Gain insights into your habits and make data-driven improvements.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
  {
    title: 'Set Meaningful Goals',
    description: 'Define clear objectives and track your journey to success.',
    icon: <Star sx={{ color: 'gold', fontSize: 40 }} />,
  },
];

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mt: 4, color: 'text.title' }}
        >
          Why Track Your Habits?
        </Typography>
      </motion.div>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 4,
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                {feature.icon}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', mb: 1, color: 'text.secondary' }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Box textAlign="center" sx={{ mt: 6, mb: 4 }}>
          <Typography
            sx={{ color: 'text.title' }}
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            <EmojiEvents
              sx={{ color: 'gold', fontSize: 40, verticalAlign: 'middle' }}
            />
            Stay on Track, Build Habits!
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: '0 auto', maxWidth: '900px' }}
          >
            We know how hard it can be to stay on track and resist the pull of
            procrastination.
            <br /> Some days, motivation just isn&apos;t there, and building
            good habits feels like an uphill battle. But you&apos;re not alone
            in this journey. Our app is designed to be your personal
            accountability partner—helping you take small, consistent steps
            toward your goals. Whether you want to develop healthier habits,
            boost productivity, or simply become a better version of yourself,
            we’re here to support you. Progress isn’t about perfection - it’s
            about showing up, even on the tough days. And no matter how many
            times you stumble, what truly matters is that you keep going. So
            take a deep breath, set your intentions, and let’s build the future
            you want—one habit at a time. We believe in you! :){' '}
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AboutPage;
