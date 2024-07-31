import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfoFromLocal = async () => {
  const userId = await AsyncStorage.getItem('userId');
  const userName = await AsyncStorage.getItem('userName');
  return { userId: userId, userName: userName };
};

export const getAccessTokenFromLocal = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  return accessToken;
};
