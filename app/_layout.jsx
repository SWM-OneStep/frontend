import CategoryAddIcon from '@/components/CategoryAddIcon';
import HeaderIcon from '@/components/HeaderIcon';
import HeaderMenu from '@/components/HeaderMenu';
import { env, getSentryConfig, getStoryBookConfig } from '@/constants/env';
import LoginProvider from '@/contexts/LoginContext';
import '@/locales/index';
import { default as theme } from '@/theme/theme.json';
import * as eva from '@eva-design/eva';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import FunnelProvider from '@/contexts/FunnelContext';

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

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp();
}

const queryClient = new QueryClient();

// 헤더 우측 컴포넌트
const HeaderRight = () => <HeaderMenu />;

// 헤더 좌측 컴포넌트
const HeaderLeft = () => <HeaderIcon />;

const NavigateToCategoryListView = () => <CategoryAddIcon />;
const RootLayout = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <FunnelProvider>
            <IconRegistry icons={[EvaIconsPack]} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
              <GestureHandlerRootView>
                <Stack screenOptions={{ headerShadowVisible: false }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerTitle: '',
                      headerRight: HeaderRight,
                      headerLeft: HeaderLeft,
                    }}
                  />
                  <Stack.Screen
                    name="oauthredirect"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="categoryAddView"
                    options={{
                      headerTitle: t('views._layout.addCategory'),
                      headerTitleAlign: 'center',
                    }}
                  />
                  <Stack.Screen
                    name="categoryListView"
                    options={{
                      headerTitle: t('views._layout.manageCategory'),
                      headerTitleAlign: 'center',
                      headerRight: NavigateToCategoryListView,
                    }}
                  />
                  <Stack.Screen
                    name="categoryEditView"
                    options={{
                      headerTitle: t('views._layout.editCategory'),
                      headerTitleAlign: 'center',
                    }}
                  />
                  <Stack.Screen
                    name="settingsView"
                    options={{
                      headerTitle: t('views._layout.settings'),
                      headerTitleAlign: 'center',
                    }}
                  />
                  <Stack.Screen
                    name="settingsContactView"
                    options={{
                      headerTitle: t('views._layout.contact'),
                      headerTitleAlign: 'center',
                    }}
                  />
                  <Stack.Screen
                    name="settingsLanguageView"
                    options={{
                      headerTitle: t('views.settingsView.language'),
                      headerTitleAlign: 'center',
                    }}
                  />
                  <Stack.Screen
                    name="FunnelScreen"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </GestureHandlerRootView>
            </ApplicationProvider>
          </FunnelProvider>
        </LoginProvider>
      </QueryClientProvider>
    </>
  );
};

let AppEntryPoint = Sentry.wrap(RootLayout);

if (getStoryBookConfig() === 'true') {
  AppEntryPoint = require('@/.storybook').default;
}
export default AppEntryPoint;
