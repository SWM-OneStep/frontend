import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useCallback } from 'react';

const androidClientId =
  '156298722864-8d78oc16uvniu6k2c7l2fh1dc60qoq3i.apps.googleusercontent.com';

const App = () => {
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
