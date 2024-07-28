import { LoginContext } from '@/contexts/LoginContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Button, Text } from '@ui-kitten/components';
import * as Google from 'expo-auth-session/providers/google';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GoogleIcon } from './../components/GoogleIcon';
import { makeRedirectUri } from 'expo-auth-session';
import { Api } from '@/utils/api';
const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const imageSource = require('../assets/todo_logo.png');
const redirectUri = makeRedirectUri({
  scheme: 'onestep',
  path: '/',
});

const config = {
  androidClientId,
};

const Login = () => {
  const { setIsLoggedIn } = useContext(LoginContext);

  let accessTokenRef = useRef(null);

  const [request, response, promptAsync] = Google.useAuthRequest(
    config,
    redirectUri,
  );

  const getTokenFromLocal = async () => {
    const jwtAccessToken = await AsyncStorage.getItem('accessToken');
    return jwtAccessToken;
  };

  const handleLocalToken = async () => {
    const token = await getTokenFromLocal();
    if (token) {
      try {
        Api.verifyToken(token).then(() => router.replace('(tabs)'));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getDeviceToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('deviceToken');
      if (token === null) {
        const token2 = await messaging().getToken();
        await AsyncStorage.setItem('deviceToken', token2);
        return token2;
      }
      return token;
    } catch (error) {
      try {
        const token = await messaging().getToken();
        await AsyncStorage.setItem('deviceToken', token);
        return token;
      } catch (e) {
        router.replace('index');
        return null;
      }
    }
  }, []);

  const getUserInfo = useCallback(async () => {
    const localResponse = await Api.getUserInfo(accessTokenRef.current);
    if (!localResponse.ok || localResponse.error) {
      return null;
    }
    const responseData = localResponse.json();
    return responseData;
  }, []);

  const handleToken = useCallback(async () => {
    const getToken = async ({ token }) => {
      const deviceToken = await getDeviceToken();

      const tokenData = {
        token: token,
        deviceToken: deviceToken,
      };
      const localResponse = await Api.login(tokenData);
      const localJwtData = await localResponse.json();
      if (localResponse.error) {
        return;
      }
      if (localJwtData) {
        await AsyncStorage.setItem('accessToken', localJwtData.access);
        await AsyncStorage.setItem('refreshToken', localJwtData.refresh);
        accessTokenRef.current = localJwtData.access;
        setIsLoggedIn(true);
      }
    };

    if (response?.type === 'success') {
      const token = response.authentication?.idToken;
      if (token) {
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
        // 왜 userId AsyncStorage에 저장하는지 모르겠음
        await getToken({ token });
        const userInfo = await getUserInfo();

        await AsyncStorage.setItem('userId', userInfo.id.toString());
        await AsyncStorage.setItem('username', userInfo.username);
        router.replace('(tabs)');
      }
    }
  }, [response, setIsLoggedIn, getDeviceToken, getUserInfo]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.iconContainer}>
        <Image source={imageSource} style={styles.icon} />
      </View>
      <View style={styles.buttonContainer}>
        <Text category="h2">OneStep</Text>
        <Button accessoryLeft={GoogleIcon} onPress={() => promptAsync()}>
          Sign in with Google
        </Button>
        <Link replace href="/(tabs)">
          <Text appearance="hint">Go to Main page</Text>
        </Link>
        <Button onPress={handleLocalToken}>Check Local Token</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
