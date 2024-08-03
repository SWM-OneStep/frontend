import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import { default as useTodosQuery } from '@/hooks/useTodoQuery';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
import { useQueryClient } from '@tanstack/react-query';
import { Input, List } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import InboxTodo from './InboxTodo';

const InboxTodos = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <View>
        <InboxTodo item={item} drag={drag} isActive={isActive} />
      </View>
    );
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    const todos = useTodoStore.getState().todos;
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: null,
      endDate: null,
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

export default InboxTodos;
