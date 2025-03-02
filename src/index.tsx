import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import './index.css';
import theme from './styles/theme';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
