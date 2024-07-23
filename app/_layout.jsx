import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import LoginProvider from '@/contexts/LoginContext';
import ModalProvider from '@/contexts/ModalContext';
import { default as theme } from '@/theme/theme.json'; // 커스텀 테마 파일
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <>
      <LoginProvider>
        <DateProvider>
          <CategoryProvider>
            <ModalProvider>
              <IconRegistry icons={[EvaIconsPack]} />
              <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ApplicationProvider>
            </ModalProvider>
          </CategoryProvider>
        </DateProvider>
      </LoginProvider>
    </>
  );
};

export default RootLayout;
