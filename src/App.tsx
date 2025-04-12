import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import HomePage from './pages/home-page';
import Navigation from './components/navigation';
import { AuthProvider } from './context/auth-context';
import { NotificationProvider } from './context/notification-context';
import AboutPage from './pages/about/index-page';
import ContactsPage from './pages/contacts/contacts-page';
import ProfilePage from './pages/profile/profile-page';
import BoardPage from './pages/profile/board/board-page';
import NotFoundPage from './components/not-found-page';
import HabitDetailPage from './pages/habit-progress/habit-detail-page';

const App = () => {
  return (
    <Box>
      <NotificationProvider>
        <AuthProvider>
          <Navigation />
          <Box>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/profile">
                <Route path=":userId" element={<ProfilePage />} />
                <Route path=":userId/board" element={<BoardPage />} />
                <Route path="settings" element={<ProfilePage />} />
              </Route>
              <Route path="/habits/:habitId" element={<HabitDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </AuthProvider>
      </NotificationProvider>
    </Box>
  );
};

export default App;
