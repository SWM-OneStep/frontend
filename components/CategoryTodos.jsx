import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Text } from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import DailyTodos from './DailyTodos';
import TodoModal from './TodoModal';

const CategoryTodos = () => {
  const todos = useTodoStore(state => state.todos);
  const currentTodos = useTodoStore(state => state.currentTodos);
  const fetchTodo = useTodoStore(state => state.fetchTodo);
  const filterTodoByCategory = useTodoStore(
    state => state.filterTodoByCategory,
  );
  const { selectedCategory } = useContext(CategoryContext);
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

  const getTodoById = todoId => {
    if (Array.isArray(currentTodos) && currentTodos.length > 0) {
      return currentTodos.filter(t => t.id === todoId);
    } else {
      return null;
    }
  };

  const handleTodoPress = todoId => {
    const todo = getTodoById(todoId);
    if (todo != null) {
      setSelectedTodo(todo);
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  // return <DailyTodos todos={todos} />;
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <DailyTodos todos={currentTodos} />
      <TodoModal
        item={selectedTodo}
        visible={modalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};

export default CategoryTodos;
