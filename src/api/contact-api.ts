import { useMemo } from 'react';
import { axiosInstance } from './api';

const CONTACTS = 'contacts';

const useContactApi = () => {
  return useMemo(
    () => ({
      sendMessage: (payload: {
        name: string;
        email: string;
        message: string;
      }) =>
        axiosInstance
          .post<any>('/contact/send-message', payload)
          .then((res) => res.data)
          .catch((error) => Promise.reject(error)),
      queryKey: CONTACTS,
    }),
    [],
  );
};

export { useContactApi, CONTACTS };
