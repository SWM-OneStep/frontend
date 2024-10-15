import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';

export function useDeviceToken() {
  const [deviceToken, setDeviceToken] = useState(null);

  const getDeviceToken = useCallback(async () => {
    try {
      let token = await AsyncStorage.getItem('deviceToken');
      if (!token) {
        token = await messaging().getToken();
        await AsyncStorage.setItem('deviceToken', token);
      }
      setDeviceToken(token);
      return token;
    } catch (e) {
      Sentry.captureException(e);
    }
  }, []);

  useEffect(() => {
    getDeviceToken();
  }, [getDeviceToken]);

  return {
    deviceToken,
    getDeviceToken,
  };
}
