import '@/locales/index';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useTranslation } from 'react-i18next';
import { Linking, SafeAreaView, StyleSheet, Text } from 'react-native'; // 올바르게 임포트

const googleFormUrl = 'https://forms.gle/ZdgNEewuzCJ4U4JQ8';

const SettingsContactView = () => {
  const { t, i18n } = useTranslation();
  const handleGoogleFormPress = () => {
    Linking.openURL(googleFormUrl);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Layout style={styles.layout} level="1">
            {i18n.language === 'ko' ? (
              <Text style={styles.text}>
                <Text
                  style={styles.link}
                  onPress={() => handleGoogleFormPress()}
                >
                  구글 폼
                </Text>
                으로 문의해 주세요.
              </Text>
            ) : (
              <Text style={styles.text}>
                <Text>Please contact us via</Text>
                <Text
                  style={styles.link}
                  onPress={() => handleGoogleFormPress()}
                >
                  Google Forms
                </Text>
              </Text>
            )}
          </Layout>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SettingsContactView;
