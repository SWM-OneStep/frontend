import { GoogleIcon } from '@/components/GoogleIcon';
import useGoogleAuth from '@/hooks/auth/useGoogleAuth';
import '@/locales/index';
import { Button, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';

const imageSource = require('../assets/todo_logo.png');

const Login = () => {
  const { t, i18n } = useTranslation();

  const { signInWithGoogle } = useGoogleAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.iconContainer}>
        <Image source={imageSource} style={styles.icon} />
      </View>
      <View style={styles.buttonContainer}>
        <Text category="h2">OneStep</Text>
        <Button accessoryLeft={GoogleIcon} onPress={() => signInWithGoogle()}>
          {t('views.index.signIn')}
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
