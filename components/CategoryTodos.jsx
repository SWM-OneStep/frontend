import useTodoStore from '@/contexts/TodoStore';
import { Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import DailyTodos from './DailyTodos';

const CategoryTodos = () => {
  const todos = useTodoStore(state => state.todos);
  const fetchTodo = useTodoStore(state => state.fetchTodo);
  const filterTodoByCategory = useTodoStore(
    state => state.filterTodoByCategory,
  );
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const awaitForFetchTodo = async () => {
      setLoading(true);
      await fetchTodo();
      filterTodoByCategory(selectedCategory);
      setLoading(false);
    };

    awaitForFetchTodo();
  }, [fetchTodo, filterTodoByCategory, selectedCategory]);

  // return <DailyTodos todos={todos} />;
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <DailyTodos todos={todos} />;
};

export default CategoryTodos;
