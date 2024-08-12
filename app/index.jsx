import { LoginContext } from '@/contexts/LoginContext';
import { Api } from '@/utils/api';
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
import { useCallback, useContext, useEffect, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GoogleIcon } from './../components/GoogleIcon';

const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const imageSource = require('../assets/todo_logo.png');

const config = {
  androidClientId,
};

const Login = () => {
  const {
    setIsLoggedIn,
    setUserId,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  } = useContext(LoginContext);

  let accessTokenRef = useRef(null);

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    handleLocalToken();
  });

  const handleLocalToken = async () => {
    const token = await getAccessTokenFromLocal();
    const user = await getUserInfoFromLocal();
    if (token) {
      Api.verifyToken(token)
        .then(() => {
          setAccessToken(token);
          setUserId(user.userId);
          router.replace('(tabs)');
        })
        .catch(e => {
          router.replace('/');
        });
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

    return localResponse;
  }, []);

  const handleToken = useCallback(async () => {
    const getToken = async ({ token }) => {
      const deviceToken = await getDeviceToken();
      const tokenData = {
        token: token,
        deviceToken: deviceToken,
      };
      const localResponse = await Api.googleLogin(tokenData);

      if (localResponse) {
        await AsyncStorage.setItem('accessToken', localResponse.access);
        await AsyncStorage.setItem('refreshToken', localResponse.refresh);
        accessTokenRef.current = localResponse.access;
        setAccessToken(localResponse.access);
        setRefreshToken(localResponse.refresh);
        setIsLoggedIn(true);
      }
    };

    if (response?.type === 'success') {
      const token = response.authentication?.idToken;
      if (token) {
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
        // 이때 로딩화면 출력
        await getToken({ token });
        const user = await getUserInfo();

        // id, name 따로 저장하길래 한번에 해보았음
        await AsyncStorage.setItem('userId', user.id.toString());
        await AsyncStorage.setItem('userName', user.username);
        setUserId(user.id);
        router.replace('(tabs)');
      }
    }
  }, [
    response,
    getDeviceToken,
    setAccessToken,
    setIsLoggedIn,
    getUserInfo,
    setUserId,
    setRefreshToken,
  ]);

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
        <Button onPress={() => handleLocalToken()}>Check Local Token</Button>
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
