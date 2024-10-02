import { LoginContext } from '@/contexts/LoginContext';
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
  const data = [
    {
      title: '내 정보',
      id: 1,
      handlePress: () => {},
    },
    {
      title: '언어 변경',
      id: 2,
      handlePress: () => {},
    },
    {
      title: '문의',
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
