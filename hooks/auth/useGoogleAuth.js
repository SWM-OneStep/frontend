import { useCallback, useState, useContext, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Sentry from '@sentry/react-native';
import { useApi } from '../api/useApi';
import { useStorage } from './useStorage';
import { useDeviceToken } from './useDeviceToken';
import { LoginContext } from '@/contexts/LoginContext';
import { useRouter } from 'expo-router';

const useGoogleAuth = () => {
  const [androidClientId, setAndroidClientId] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
  });
  const { getAndroidClientId: getAndroidClientIdonUseApi } = useApi();
  const router = useRouter();
  const { handleLocalToken, handleGoogleLoginToken } = useToken();

  const { setIsLoggedIn, setUserId, setAccessToken } = useContext(LoginContext);

  const getAndroidClientId = async () => {
    const androidClientIdResponse = await getAndroidClientIdonUseApi();
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

  return { signInWithGoogle };
};

const useToken = () => {
  const storage = useStorage();
  const api = useApi();
  const { deviceToken } = useDeviceToken();

  const handleLocalToken = useCallback(async () => {
    try {
      const token = await storage.getItem('accessToken');
      const userId = await storage.getItem('userId');
      if (token && userId) {
        await api.verifyToken(token);
        return { token, userId };
      } else {
        return null;
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }, [api, storage]);

  const handleGoogleLoginToken = async token => {
    try {
      const loginResponse = await api.googleLogin({ token, deviceToken });
      await storage.setItem('accessToken', loginResponse.access);
      await storage.setItem('refreshToken', loginResponse.refresh);
      const user = await api.getUserInfo();
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