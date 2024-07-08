import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import * as Google from 'expo-auth-session/providers/google';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesignIconsPack } from '../antdesign-icons';
import GoogleLoginButton from '../components/GoogleLoginButton';

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
          <StatusBar style="auto" />
          <GoogleLoginButton onPress={promptAsync} />
          <Link replace href="/(tabs)">
            <Text appearance="hint">Go to Main page</Text>
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
