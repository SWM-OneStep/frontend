import { CategoryContext } from '@/contexts/CategoryContext';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import useCategoriesQuery from '@/hooks/useCategoriesQuery';
import { LoginContext } from '@/contexts/LoginContext';

const CategoryScroll = () => {
  const router = useRouter();

  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [orderedCategories, setOrderedCategories] = useState([]);
  const { userId, accessToken } = useContext(LoginContext);
  const onSuccess = data => {
    const sorted = [...data].sort((a, b) => a.id - b.id);
    setOrderedCategories(sorted);
  };

  const { isLoading, error } = useCategoriesQuery(
    accessToken,
    userId,
    onSuccess,
  );

  useEffect(() => {
    if (orderedCategories && orderedCategories.length > 0) {
      setSelectedCategory(orderedCategories[0].id);
    }
  }, [orderedCategories, setSelectedCategory]);

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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {orderedCategories &&
          orderedCategories.map((item, index) => (
            <Button
              accessoryLeft={starIcon}
              style={styles.button}
              status={(selectedCategory === item.id && 'primary') || 'basic'}
              onPress={() => handlePress(item.id)}
              key={index}
            >
              <Text>{item.title}</Text>
            </Button>
          ))}
        <Button
          style={styles.button}
          onPress={() => router.push('/categoryAddView')}
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
