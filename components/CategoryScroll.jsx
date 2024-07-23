import { CategoryContext } from '@/contexts/CategoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout } from '@ui-kitten/components';
import { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import CategoryButton from './CategoryButton';

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

  return (
    <Layout>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) =>
          selectedCategory === index ? (
            <CategoryButton
              text={item.title}
              color={item.color}
              key={index}
              isSelected={true}
            />
          ) : (
            <CategoryButton
              text={item.title}
              color={item.color}
              key={index}
              isSelected={false}
            />
          ),
        )}
      </ScrollView>
    </Layout>
  );
};

export default CategoryScroll;
