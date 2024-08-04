import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import useTodosQuery from '@/hooks/useTodoQuery';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
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
  const { selectedDate } = useContext(DateContext);
  const { selectedCategory } = useContext(CategoryContext);

  const modalVisible = useModalStore(state => state.modalVisible);
  const selectedTodo = useTodoStore(state => state.selectedTodo);
  const closeModal = useModalStore(state => state.closeModal);
  const setExistingOrders = useTodoStore(state => state.setExistingOrders);

  useEffect(() => {
    if (isSuccess) {
      useTodoStore.setState({ todos: data });
      setExistingOrders(data.map(todo => todo.order));
      let filteredTodos = data.filter(
        todo =>
          todo.categoryId === selectedCategory &&
          isTodoIncludedInTodayView(
            todo.startDate,
            todo.endDate,
            selectedDate.format('YYYY-MM-DD'),
          ),
      );
      useTodoStore.setState({ currentTodos: filteredTodos });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, selectedCategory, selectedDate]);

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
