import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useCallback } from 'react';
import { Link } from 'expo-router';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { AntDesignIconsPack } from '../antdesign-icons';

const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const Login = () => {
  const config = {
    androidClientId,
  };
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const handleToken = useCallback(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      if (token) {
        console.log('access token', token);
        // 여기서 토큰을 사용하여 추가 작업을 수행할 수 있습니다.
        // 예: 상태 업데이트, API 호출 등
      } else {
        console.log('Access token is undefined');
      }
    }
  }, [response]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <>
      <IconRegistry icons={AntDesignIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <GoogleLoginButton onPress={promptAsync} />
          <Link replace href="/(tabs)">
            Go to Main page
          </Link>
        </View>
      </ApplicationProvider>
    </>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
