import { CategoryContext } from '@/contexts/CategoryContext';
import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import { Text } from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import DailyTodos from './DailyTodos';
import TodoModal from './TodoModal';
import { KeyboardAvoidingView } from 'react-native';

const CategoryTodos = () => {
  const currentTodos = useTodoStore(state => state.currentTodos);
  const fetchTodo = useTodoStore(state => state.fetchTodo);
  const filterTodoByCategory = useTodoStore(
    state => state.filterTodoByCategory,
  );
  const modalVisible = useModalStore(state => state.modalVisible);
  const selectedTodo = useTodoStore(state => state.selectedTodo);
  const closeModal = useModalStore(state => state.closeModal);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView>
      <DailyTodos todos={currentTodos} />
      <TodoModal
        item={selectedTodo}
        visible={modalVisible}
        closeModal={() => closeModal()}
      />
    </KeyboardAvoidingView>
  );
};

export default CategoryTodos;
