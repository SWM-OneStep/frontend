import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  List,
  ListItem,
  Icon,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { LoginContext } from '@/contexts/LoginContext';
import useCategoriesQuery from '@/hooks/useCategoriesQuery';
import { useRouter } from 'expo-router';
const HomeIcon = props => <Icon {...props} name="star" />;

const renderItemIcon = props => <HomeIcon {...props} />;

const renderItem = ({ item, handlePress }) => (
  <ListItem
    title={item.title}
    accessoryLeft={renderItemIcon}
    onPress={() => handlePress(item)}
    style={styles.listItem}
  />
);

const SettingsView = () => {
  const data = [
    {
      title: '내 정보',
      id: 1,
    },
    {
      title: '언어 변경',
      id: 2,
    },
    {
      title: '문의',
      id: 3,
    },
  ];

  const { userId, accessToken } = useContext(LoginContext);
  const router = useRouter();

  const handlePress = item => {};
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Layout style={styles.layout} level="1">
            <List
              style={styles.list}
              data={data}
              renderItem={({ item }) => renderItem({ item, handlePress })}
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
