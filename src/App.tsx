import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page';
import Navigation from './components/navigation';

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
