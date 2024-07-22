import { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
