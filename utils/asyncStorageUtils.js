import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
};

export const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  return accessToken;
};
