import LoginProvider from '@/contexts/LoginContext';
import { default as theme } from '@/theme/theme.json';
import * as eva from '@eva-design/eva';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Sentry.init({
  environment: 'development',
  dsn: 'https://f71f6726967afe21cd8a551da024d5be@o4507736964136960.ingest.us.sentry.io/4507736971739136',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

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
