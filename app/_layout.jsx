import { Stack } from 'expo-router';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LoginProvider from '@/contexts/LoginContext';
import { default as theme } from '@/theme/theme.json'; // 커스텀 테마 파일
import DateProvider from '@/contexts/DateContext';

const RootLayout = () => {
  return (
    <>
      <LoginProvider>
        <DateProvider>
        <IconRegistry icons={[EvaIconsPack]} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ApplicationProvider>
        </DateProvider>
      </LoginProvider>
    </>
  );
};

export default RootLayout;
