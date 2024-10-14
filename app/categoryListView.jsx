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
import useCategoriesQuery from '@/hooks/api/useCategoriesQuery';
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

const CategoryListView = () => {
  const [orderedCategories, setOrderedCategories] = useState([]);
  const { userId, accessToken } = useContext(LoginContext);
  const router = useRouter();
  const { isLoading, error, data, isSuccess } = useCategoriesQuery(userId);
  useEffect(() => {
    if (isSuccess) {
      const sorted =
        data.length > 1 ? [...data].sort((a, b) => a.id - b.id) : data;
      setOrderedCategories(sorted);
    }
  }, [data, isSuccess]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handlePress = item => {
    router.push({
      pathname: '/categoryEditView',
      params: {
        ...item,
      },
    });
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Layout style={styles.layout} level="1">
            <List
              style={styles.list}
              data={orderedCategories}
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

export default CategoryListView;
