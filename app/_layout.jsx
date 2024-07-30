import LoginProvider from '@/contexts/LoginContext';
import { default as theme } from '@/theme/theme.json'; // 커스텀 테마 파일
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export default RootLayout;
