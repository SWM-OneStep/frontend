import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Link, router } from 'expo-router';
import { GoogleIcon } from './../components/GoogleIcon';
import { LoginContext } from '@/contexts/LoginContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const loginApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/auth/login/google/';

// const loginApi =
//   'http://10.0.2.2:8000/auth/login/google/';


const imageSource = require('../assets/todo_logo.png');

const Login = () => {

  const {
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(LoginContext);
  const config = {
    androidClientId,
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  
  const handleToken = useCallback(() => {
    const getToken = async ({ token }) => {
      const tokenData = {
        token: token,
      };
      const localResponse = await fetch(loginApi, {
        method: 'POST', // HTTP 메서드 지정
        headers: {
          'Content-Type': 'application/json', // 요청 헤더 설정
        },
        body: JSON.stringify(tokenData), // 전송할 데이터를 JSON 문자열로 변환
      });
      const localJwtData = await localResponse.json();
      if (localResponse.error) {
        return;
      }
      if (localJwtData) {
        await AsyncStorage.setItem('accessToken', localJwtData.access);
        await AsyncStorage.setItem('refreshToken', localJwtData.refresh);
        setIsLoggedIn(true);
      }
    };

    if (response?.type === 'success') {
      const token = response.authentication?.idToken;
      if (token) {
        console.log('access token', response.authentication);
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
        getToken({ token });
        router.replace('(tabs)');
      } else {
        console.log('Access token is undefined');
      }
    }
  }, [response, setIsLoggedIn]);

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
