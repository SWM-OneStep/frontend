import useCategoriesQuery from '@/hooks/useCategoriesQuery';
import { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from './LoginContext';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const { isLoading, error, data, isSuccess } = useCategoriesQuery(
    accessToken,
    userId,
  );

  useEffect(() => {
    if (isSuccess) {
      setSelectedCategory(data[0].id);
    }
  }, [data, isSuccess]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { userId, accessToken } = useContext(LoginContext);

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
