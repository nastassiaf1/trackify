import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home-page';
import Navigation from './components/navigation';
import { AuthProvider } from './context/auth-context';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
