import { LoginContext } from '@/contexts/LoginContext';
import { Api } from '@/utils/api';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import * as Sentry from '@sentry/react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
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
  };

  const onAppleButtonPress = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.example.client-android',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://example.com/auth/callback',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const appleLoginResponse = await appleAuthAndroid.signIn();

    // Send the authorization code to your backend for verification
    console.log('appleLoginResponse', appleLoginResponse);
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
