import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationContextType {
  showNotification: (message: string, severity?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: NotificationType | null;
  }>({
    message: '',
    severity: null,
  });

  const showNotification = (
    message: string,
    severity: NotificationType = 'info',
  ) => {
    setSnackbar({ message, severity });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {snackbar.severity && (
        <Snackbar
          open={Boolean(snackbar.message)}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ message: '', severity: null })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ message: '', severity: null })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
};
