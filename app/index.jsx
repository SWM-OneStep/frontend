import { AppleIcon } from '@/components/AppleIcon';
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

  const { signInWithGoogle, signInWithApple } = useGoogleAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.iconContainer}>
        <Image source={imageSource} style={styles.icon} />
      </View>
      <View style={styles.buttonAndTextContainer}>
        <View style={styles.textContainer}>
          <Text category="h2">OneStep</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            accessoryLeft={GoogleIcon}
            onPress={() => signInWithGoogle()}
          >
            {t('views.index.googleSignIn')}
          </Button>
          <Button
            style={styles.button}
            accessoryLeft={AppleIcon}
            onPress={() => signInWithApple()}
          >
            {t('views.index.appleSignIn')}
          </Button>
        </View>
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
  buttonAndTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 40,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default Login;
