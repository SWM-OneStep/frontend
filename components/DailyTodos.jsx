import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import { useTodoAddMutation } from '@/hooks/useTodoMutations';
import {
  default as TODO_QUERY_KEY,
  default as useTodosQuery,
} from '@/hooks/useTodoQuery';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
import { useQueryClient } from '@tanstack/react-query';
import { Input, List } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DailyTodo from './DailyTodo';

const DailyTodos = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { mutate: addTodo, isSuccess: addTodoIsSuccess } = useTodoAddMutation();
  const { selectedDate } = useContext(DateContext);
  const {
    isLoading,
    error,
    data,
    isSuccess: isTodosQuerySuccess,
  } = useTodosQuery(accessToken, userId);
  const currentTodos = useTodoStore(state => state.currentTodos);

  useEffect(() => {
    if (isTodosQuerySuccess) {
      useTodoStore.setState({ todos: data });
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
  }, [isTodosQuerySuccess, data, selectedCategory, selectedDate]);

  useEffect(() => {
    if (addTodoIsSuccess) {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTodoIsSuccess]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <View>
        <DailyTodo item={item} drag={drag} isActive={isActive} />
      </View>
    );
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    const todos = useTodoStore.getState().todos;
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: selectedDate.format('YYYY-MM-DD'),
      endDate: selectedDate.format('YYYY-MM-DD'),
      content: input,
      categoryId: selectedCategory,
      order:
        todos.length > 0
          ? LexoRank.parse(todos[todos.length - 1].order)
              .genNext()
              .toString()
          : LexoRank.middle().toString(),
    };

    addTodo({ accessToken, todoData: newTodoData });
    setInput('');
  };
  return (
    <Fragment>
      <List
        data={currentTodos}
        renderItem={renderTodo}
        ListFooterComponentStyle={{ paddingTop: 0, flex: 1 }}
      />
      {/* <KeyboardAvoidingView> */}
      <Input
        placeholder="Place your Text"
        value={input}
        onChangeText={nextInput => {
          setInput(nextInput);
        }}
        autoFocus={false}
        onSubmitEditing={handleSubmit}
      />
      {/* </KeyboardAvoidingView> */}
    </Fragment>
  );
};

export default DailyTodos;
