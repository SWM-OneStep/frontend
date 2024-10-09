import '@/locales/index';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  IndexPath,
  Layout,
  Menu,
  MenuItem,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';

const SettingsLanguageView = () => {
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(i18n.language === 'ko' ? 0 : 1),
  );

  const handleKoreanPress = () => {
    i18n.changeLanguage('ko');
  };

  const handleEnglishPress = () => {
    i18n.changeLanguage('en');
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Layout style={styles.layout} level="1">
            <Menu
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
            >
              <MenuItem
                title={t('views.settingsLanguageView.korean')}
                onPress={handleKoreanPress}
              />
              <MenuItem
                title={t('views.settingsLanguageView.english')}
                onPress={handleEnglishPress}
              />
            </Menu>
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

export default SettingsLanguageView;
