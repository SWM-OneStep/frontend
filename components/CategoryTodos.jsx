import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Text } from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import DailyTodos from './DailyTodos';

const CategoryTodos = () => {
  const todos = useTodoStore(state => state.todos);
  const currentTodos = useTodoStore(state => state.currentTodos);
  const fetchTodo = useTodoStore(state => state.fetchTodo);
  const filterTodoByCategory = useTodoStore(
    state => state.filterTodoByCategory,
  );
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const awaitForFetchTodo = async () => {
      setLoading(true);
      await fetchTodo();
      setLoading(false);
    };

    awaitForFetchTodo();
  }, [fetchTodo]);

  useEffect(() => {
    if (!loading) {
      filterTodoByCategory(selectedCategory);
    }
  }, [filterTodoByCategory, selectedCategory, loading]);

  // return <DailyTodos todos={todos} />;
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <DailyTodos todos={currentTodos} />;
};

export default CategoryTodos;
