import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useCategoriesQuery from '@/hooks/useCategoriesQuery';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  handleScroll,
} from '@/utils/handleScroll';
import {
  CATEGORY_ADDCATEGORY_CLICK_EVENT,
  CATEGORY_CATEGORY_CLICK_EVENT,
  CATEGORY_SCROLL_EVENT,
  handleLogEvent,
} from '@/utils/logEvent';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const CategoryScroll = () => {
  const router = useRouter();

  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [orderedCategories, setOrderedCategories] = useState([]);
  const { userId, accessToken } = useContext(LoginContext);

  const { isLoading, error, data, isSuccess } = useCategoriesQuery(
    accessToken,
    userId,
  );

  useEffect(() => {
    if (isSuccess) {
      const sorted =
        data.length > 1 ? [...data].sort((a, b) => a.id - b.id) : data;
      setOrderedCategories(sorted);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (orderedCategories.length > 0) {
      setSelectedCategory(orderedCategories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedCategories]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handlePress = index => {
    setSelectedCategory(index);
  };
  const starIcon = props => <Icon {...props} name="star" />;
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <Layout>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={event => handleScroll(CATEGORY_SCROLL_EVENT, userId, event)}
        scrollEventThrottle={DEFAULT_SCROLL_EVENT_THROTTLE}
      >
        {orderedCategories &&
          orderedCategories.map((item, index) => (
            <Button
              accessoryLeft={starIcon}
              style={styles.button}
              status={(selectedCategory === item.id && 'primary') || 'basic'}
              onPress={() => {
                handleLogEvent(CATEGORY_CATEGORY_CLICK_EVENT, {
                  time: new Date().toISOString(),
                  userId: userId,
                  categoryId: item.id,
                });
                handlePress(item.id);
              }}
              key={index}
            >
              <Text>{item.title}</Text>
            </Button>
          ))}
        <Button
          style={styles.button}
          onPress={() => {
            handleLogEvent(CATEGORY_ADDCATEGORY_CLICK_EVENT, {
              time: new Date().toISOString(),
              userId: userId,
            });
            router.push('/categoryAddView');
          }}
        >
          <Text> + </Text>
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 40,
  },
});

export default CategoryScroll;
