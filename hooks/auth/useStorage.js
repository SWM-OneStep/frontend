import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage() {
  const getItem = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error('Error reading value:', error);
      return null;
    }
  };

  const setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving value:', error);
    }
  };

  const removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing value:', error);
    }
  };

  const clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
}
