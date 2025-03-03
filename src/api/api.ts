import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;  // Возвращаем данные
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

export const getUserHabits = async (userId: string) => {
  try {
    const response = await api.get(`/habits/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user habits', error);
    throw error;
  }
};

export default api;
