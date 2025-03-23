import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home-page';
import Navigation from './components/navigation';
import { AuthProvider } from './context/auth-context';
import { NotificationProvider } from './context/notification-context';
import AboutPage from './pages/about/index-page';
import ContactsPage from './pages/contacts/contacts-page';
import ProfilePage from './pages/profile/profile-page';
import BoardPage from './pages/profile/board-page';
import NotFoundPage from './components/not-found-page';

const App = () => {
  return (
    <div>
      <NotificationProvider>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/profile">
              <Route path=":userId" element={<ProfilePage />} />
              <Route path=":userId/board" element={<BoardPage />} />
              <Route path="settings" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
};

export default App;
