import { LoginContext } from '@/contexts/LoginContext';
import useApi from '@/utils/api';
import {
  getAccessTokenFromLocal,
  getUserInfoFromLocal,
} from '@/utils/asyncStorageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Button, Text } from '@ui-kitten/components';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GoogleIcon } from './../components/GoogleIcon';

const imageSource = require('../assets/todo_logo.png');

const Login = () => {
  const [androidClientId, setAndroidClientId] = useState('');
  const {
    setIsLoggedIn,
    setUserId,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  } = useContext(LoginContext);

  const handleLocalToken = async () => {
    const token = await getAccessTokenFromLocal();
    const user = await getUserInfoFromLocal();
    verifyToken(token, useMetadata);
    setAccessToken(token);
    setUserId(user.userId);
    router.replace('(tabs)');
  };

  const {
    useMetadata,
    verifyToken,
    getUserInfo,
    googleLogin,
    getAndroidClientId,
  } = useApi();

  let accessTokenRef = useRef(null);
  const config = {
    androidClientId,
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    handleLocalToken();
  });

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
        return null;
      }
    }
  }, []);

  const getToken = useCallback(
    async ({ token }) => {
      const deviceToken = await getDeviceToken();
      const tokenData = {
        token: token,
        deviceToken: deviceToken,
      };
      const localResponse = await googleLogin(tokenData, useMetadata);

      if (localResponse) {
        await AsyncStorage.setItem('accessToken', localResponse.access);
        await AsyncStorage.setItem('refreshToken', localResponse.refresh);
        accessTokenRef.current = localResponse.access;
        setAccessToken(localResponse.access);
        setRefreshToken(localResponse.refresh);
        setIsLoggedIn(true);
      }
    },
    [
      getDeviceToken,
      googleLogin,
      setAccessToken,
      setIsLoggedIn,
      setRefreshToken,
      useMetadata,
    ],
  );

  const handleToken = useCallback(async () => {
    if (response?.type === 'success') {
      const token = response.authentication?.idToken;
      if (token) {
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
        // 이때 로딩화면 출력
        await getToken({ token });
        const user = await getUserInfo(useMetadata);

        // id, name 따로 저장하길래 한번에 해보았음
        await AsyncStorage.setItem('userId', user.id.toString());
        await AsyncStorage.setItem('userName', user.username);
        setUserId(user.id);
        setAndroidClientId('');
        router.replace('(tabs)');
      }
    }
  }, [response, getUserInfo, setUserId, getToken, useMetadata]);

  useEffect(() => {
    handleToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    getAndroidClientId();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.iconContainer}>
        <Image source={imageSource} style={styles.icon} />
      </View>
      <View style={styles.buttonContainer}>
        <Text category="h2">OneStep</Text>
        <Button
          accessoryLeft={GoogleIcon}
          onPress={androidClientId === '' ? () => {} : () => promptAsync()}
        >
          Sign in with Google
        </Button>
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
