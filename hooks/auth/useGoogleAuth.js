import { LoginContext } from '@/contexts/LoginContext';
import { Api } from '@/utils/api';
import appleAuth from '@invertase/react-native-apple-authentication';

import * as Sentry from '@sentry/react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { useDeviceToken } from './useDeviceToken';
import { useStorage } from './useStorage';

const useGoogleAuth = () => {
  const [androidClientId, setAndroidClientId] = useState('');
  const [iosClientId, setIosClientId] = useState('');

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

  const signInWithApple = async () => {
    if (iosClientId === '') {
    } else {
    }
    await onAppleButtonPress();
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (error) {
      console.error('Apple login error:', error); // 오류 로그 출력
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

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

  return { signInWithGoogle, signInWithApple };
};

const useToken = () => {
  const storage = useStorage();
  const { deviceToken } = useDeviceToken();

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
