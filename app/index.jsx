import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Link, router } from 'expo-router';
import { GoogleIcon } from './../components/GoogleIcon';
import { LoginContext } from '@/contexts/LoginContext';

const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const Login = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    jwtAccessToken,
    setJwtAccessToken,
    jwtRefreshToken,
    setJwtRefreshToken,
  } = useContext(LoginContext);
  const config = {
    androidClientId,
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const imageSource = require('../assets/todo_logo.png');
  const handleToken = useCallback(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      if (token) {
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
        setJwtAccessToken(token);
        setJwtRefreshToken(response.authentication?.refreshToken);
        setIsLoggedIn(true);
        router.replace('(tabs)');
      }
    }
  }, [response, setJwtAccessToken, setJwtRefreshToken, setIsLoggedIn]);

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
