import { LoginContext } from '@/contexts/LoginContext';
import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import useTodosQuery from '@/hooks/useTodoQuery';
import { Text } from '@ui-kitten/components';
import { useContext, useEffect } from 'react';
import DailyTodos from './DailyTodos';
import TodoModal from './TodoModal';
const CategoryTodos = () => {
  const { accessToken, userId } = useContext(LoginContext);
  const { isLoading, error, data, isSuccess } = useTodosQuery(
    accessToken,
    userId,
  );

  const modalVisible = useModalStore(state => state.modalVisible);
  const selectedTodo = useTodoStore(state => state.selectedTodo);
  const closeModal = useModalStore(state => state.closeModal);

  useEffect(() => {
    if (isSuccess) {
      useTodoStore.setState({ currentTodos: data });
    }
  }, [isSuccess, data]);

  // useEffect(() => {
  //   const fetchTodoByCategoryThenByDate = async () => {
  //     if (!loading) {
  //       await filterTodoByCategory(selectedCategory);
  //       await filterTodoByDate(date);
  //     }
  //   };

  //   fetchTodoByCategoryThenByDate();
  // }, [filterTodoByCategory, selectedCategory, loading, filterTodoByDate, date]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <DailyTodos />
      <TodoModal
        item={selectedTodo}
        visible={modalVisible}
        closeModal={() => closeModal()}
      />
    </>
  );
};

export default CategoryTodos;
