import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import { Text } from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import DailyTodos from './DailyTodos';
import TodoModal from './TodoModal';

const CategoryTodos = () => {
  const currentTodos = useTodoStore(state => state.currentTodos);
  const fetchTodo = useTodoStore(state => state.fetchTodo);
  const filterTodoByCategory = useTodoStore(
    state => state.filterTodoByCategory,
  );
  const filterTodoByDate = useTodoStore(state => state.filterTodoByDate);
  const { date } = useContext(DateContext);
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
    const fetchTodoByCategoryThenByDate = async () => {
      if (!loading) {
        await filterTodoByCategory(selectedCategory);
        await filterTodoByDate(date);
      }
    };

    fetchTodoByCategoryThenByDate();
  }, [filterTodoByCategory, selectedCategory, loading, filterTodoByDate, date]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <DailyTodos todos={currentTodos} />
      <TodoModal
        item={selectedTodo}
        visible={modalVisible}
        closeModal={() => closeModal()}
      />
    </>
  );
};

export default CategoryTodos;
