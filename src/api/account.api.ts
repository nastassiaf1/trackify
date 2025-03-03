import api from './api';

export const getUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);

    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/register', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering', error);

    throw error;
  }
};
