import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3001';

export const register = async (username: string, password: string): Promise<void> => {
  await axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username: string, password: string): Promise<void> => {
  const response = await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
  await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
};

export const getProfile = async (): Promise<any> => {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user || '{}');
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('user');
};
