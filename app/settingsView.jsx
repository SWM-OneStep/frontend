import { LoginContext } from '@/contexts/LoginContext';
import '@/locales/index';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Layout,
  List,
  ListItem,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';

const HomeIcon = props => <Icon {...props} name="star" />;

const renderItemIcon = props => <HomeIcon {...props} />;

const renderItem = ({ item }) => (
  <ListItem
    title={item.title}
    accessoryLeft={renderItemIcon}
    onPress={() => item.handlePress()}
    style={styles.listItem}
  />
);

const SettingsView = () => {
  const { t, i18n } = useTranslation();

  const data = [
    {
      title: t('views.settingsView.account'),
      id: 1,
      handlePress: () => {},
    },
    {
      title: t('views.settingsView.language'),
      id: 2,
      handlePress: () => {},
    },
    {
      title: t('views.settingsView.contact'),
      id: 3,
      handlePress: () => {
        router.push('/settingsContactView');
      },
    },
  ];

  const { userId, accessToken } = useContext(LoginContext);
  const router = useRouter();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Layout style={styles.layout} level="1">
            <List
              style={styles.list}
              data={data}
              renderItem={({ item }) => renderItem({ item })}
            />
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
  list: {
    backgroundColor: 'white',
  },
  listItem: {
    fontSize: 40,
  },
});

export default SettingsView;
