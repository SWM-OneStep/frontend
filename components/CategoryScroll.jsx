import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import CategoryButton from './CategoryButton';

const categories = [
  { id: 1, title: 'Item 1', description: 'Description 1', color: '#FFFFFF' },
  { id: 2, title: 'Item 2', description: 'Description 2', color: '#121212' },
  { id: 3, title: 'Item 3', description: 'Description 3', color: '#020202' },
  { id: 4, title: 'Item 4', description: 'Description 4', color: '#239482' },
  { id: 5, title: 'Item 5', description: 'Description 5', color: '#929292' },
];

const categoriesApi = 'http://10.0.2.2:8000/todos/category/';

const CategoryScroll = () => {
  // useEffect(() => {
  //   fetchCategories();
  // });

  const fetchCategories = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const categoriesResponse = await fetch(categoriesApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const categoriesData = await categoriesResponse.json();
    // setCategories(categoriesData);
  };

  // const { selectedCategory, setSelectedCategory, categories, setCategories } =
  //   useContext(CategoryContext);

  return (
    <Layout>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
          <CategoryButton text={item.title} color={item.color} key={index} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default CategoryScroll;
