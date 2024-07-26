import { CategoryContext } from '@/contexts/CategoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const categoriesApi = 'http://10.0.2.2:8000/todos/category/';

const CategoryScroll = () => {
  // useEffect(() => {
  //   fetchCategories();
  // });
  const { selectedCategory, setSelectedCategory, categories, setCategories } =
    useContext(CategoryContext);

  useEffect(() => {
    const getCategories = async () => {
      // const accessToken = await AsyncStorage.getItem('accessToken');
      let userId = await AsyncStorage.getItem('userId');
      if (userId === null) {
        userId = 1;
      }
      const response = await fetch(categoriesApi + `?user_id=${userId}`, {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseData = await response.json();
      setCategories(responseData);
      setSelectedCategory(responseData[0].id);
    };
    getCategories();
  }, [setCategories, setSelectedCategory]);

  // const { selectedCategory, setSelectedCategory, categories, setCategories } =
  //   useContext(CategoryContext);

  const handlePress = index => {
    setSelectedCategory(index);
  };
  const starIcon = props => <Icon {...props} name="star" />;

  return (
    <Layout>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
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
