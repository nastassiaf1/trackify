import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home-page';
import Navigation from './components/navigation';
import { UserProvider } from './context/user-context';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
