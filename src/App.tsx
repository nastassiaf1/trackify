import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home-page';
import Navigation from './components/navigation';
import { AuthProvider } from './context/auth-context';
import { NotificationProvider } from './context/notification-context';
import AboutPage from './pages/about/index-page';
import ContactsPage from './pages/contacts/contacts-page';
import ProfilePage from './pages/profile/profile-page';

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
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
};

export default App;
