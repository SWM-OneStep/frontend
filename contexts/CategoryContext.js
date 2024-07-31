import useCategoriesQuery from '@/hooks/useCategoriesQuery';
import { createContext, useContext, useState } from 'react';
import { LoginContext } from './LoginContext';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { userId, accessToken } = useContext(LoginContext);
  const { isLoading, error, data, isSuccess } = useCategoriesQuery(
    accessToken,
    userId,
  );
  console.log('categories data', data);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
