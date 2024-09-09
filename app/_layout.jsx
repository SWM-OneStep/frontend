import { env, getSentryConfig } from '@/constants/env';
import LoginProvider from '@/contexts/LoginContext';
import { default as theme } from '@/theme/theme.json';
import * as eva from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';
import { AppRegistry, PermissionsAndroid } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SENTRY_MODE = env.SENTRY_MODE;

Sentry.init({
  enabled: ['staging', 'production'].includes(SENTRY_MODE),
  environment: SENTRY_MODE,
  dsn: 'https://f71f6726967afe21cd8a551da024d5be@o4507736964136960.ingest.us.sentry.io/4507736971739136',
  ...getSentryConfig(),
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: true,
      maskAllImages: true,
    }),
  ],
});

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

messaging().setBackgroundMessageHandler(async remoteMessage => {});

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <IconRegistry icons={[EvaIconsPack]} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="oauthredirect"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="categoryAddView" />
              </Stack>
            </GestureHandlerRootView>
          </ApplicationProvider>
        </LoginProvider>
      </QueryClientProvider>
    </>
  );
};

export default Sentry.wrap(RootLayout);

AppRegistry.registerComponent('_layout', () => RootLayout);
