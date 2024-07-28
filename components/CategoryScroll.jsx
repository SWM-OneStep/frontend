import { CategoryContext } from '@/contexts/CategoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
const categoriesApi = 'http://10.0.2.2:8000/todos/category/';

const CategoryScroll = () => {
  const router = useRouter();

  const { selectedCategory, setSelectedCategory, categories, setCategories } =
    useContext(CategoryContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('useEffect');
    const getCategories = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      let userId = await AsyncStorage.getItem('userId');
      if (userId === null) {
        userId = 1;
      }
      const response = await fetch(categoriesApi + `?user_id=${userId}`, {
        method: 'GET',
        // headers: {
        // },
      });
      const responseData = await response.json();
      console.log('restponse', responseData);
      setCategories(responseData);
      if (responseData.length > 0) setSelectedCategory(responseData[0].id);
    };
    getCategories().then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { selectedCategory, setSelectedCategory, categories, setCategories } =
  //   useContext(CategoryContext);

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
        {categories &&
          categories.map((item, index) => (
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
        <Button onPress={() => router.push('/categoryView')}>
          <Text>+</Text>
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
