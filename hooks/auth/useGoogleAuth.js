import { LoginContext } from '@/contexts/LoginContext';
import { Api } from '@/utils/api';
import * as Sentry from '@sentry/react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import messaging from '@react-native-firebase/messaging';

const useGoogleAuth = () => {
  const [androidClientId, setAndroidClientId] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId: '',
  });
  const router = useRouter();
  const { handleLocalToken, handleGoogleLoginToken } = useToken();

  const { setIsLoggedIn, setUserId, setAccessToken } = useContext(LoginContext);

  const getAndroidClientId = async () => {
    const androidClientIdResponse = await Api.getAndroidClientId();
    setAndroidClientId(androidClientIdResponse.androidClientId);
  };

  const signInWithGoogle = async () => {
    if (androidClientId === '') {
    } else {
      await promptAsync();
    }
  };

  const handleLogin = async token => {
    const result = await handleGoogleLoginToken(token);
    if (result) {
      setAccessToken(result.accessToken);
      setUserId(result.userId);
      setIsLoggedIn(true);
      router.push('/(tabs)');
    }
  };

  useEffect(() => {
    getAndroidClientId();
    handleLocalToken();
    (async () => {
      await messaging().requestPermission();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.idToken;
      if (token) {
        handleLogin(token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return { signInWithGoogle, handleLogin };
};

const useToken = () => {
  const storage = useStorage();

  const handleLocalToken = async () => {
    try {
      const token = await storage.getItem('accessToken');
      const userId = await storage.getItem('userId');
      if (token && userId) {
        await Api.verifyToken(token);
        return { token, userId };
      } else {
        return null;
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const handleGoogleLoginToken = async token => {
    try {
      const deviceToken = await messaging().getToken();
      await storage.setItem('deviceToken', deviceToken);
      const loginResponse = await Api.googleLogin({ token, deviceToken });
      await storage.setItem('accessToken', loginResponse.access);
      await storage.setItem('refreshToken', loginResponse.refresh);
      const user = await Api.getUserInfo();
      await storage.setItem('userId', user.id.toString());
      await storage.setItem('userName', user.username);

      return { accessToken: loginResponse.access, userId: user.id };
    } catch (err) {
      Sentry.captureException(err);
      return null;
    }
  };

  return { handleLocalToken, handleGoogleLoginToken };
};

export default useGoogleAuth;
