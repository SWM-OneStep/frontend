import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import useInboxTodoQuery from '@/hooks/useInboxTodoQuery';
import { useTodoAddMutation } from '@/hooks/useTodoMutations';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  handleScroll,
} from '@/utils/handleScroll';
import { INBOXVIEW_SCROLL_EVENT } from '@/utils/logEvent';
import { Input } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import InboxTodo from './InboxTodo';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const InboxTodos = () => {
  const [input, setInput] = useState('');
  const { userId } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const {
    isLoading,
    error,
    data: inboxTodoData,
    isSuccess: isInboxTodoQuerySuccess,
  } = useInboxTodoQuery(userId);
  const setInboxTodos = useTodoStore(state => state.setInboxTodos);
  const inboxCurrentTodos = useTodoStore(state => state.inboxCurrentTodos);
  const setInboxCurrentTodos = useTodoStore(
    state => state.setInboxCurrentTodos,
  );
  const { mutate: addInboxTodo } = useTodoAddMutation();
  const { mutate: updateTodo } = useTodoAddMutation();
  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <InboxTodo item={item} drag={drag} isActive={isActive} />
      </ScaleDecorator>
    );
  };

  const handleDragEnd = async ({ data }) => {
    const updatedData = data.map((item, index) => {
      return {
        todoId: item.id,
        order: LexoRank.parse(item.order).toString(),
      };
    });
    updateTodo({
      accessToken: accessToken,
      updatedData: updatedData,
    });
  };
  const handleSubmit = async () => {
    const todos = useTodoStore.getState().todos;
    const newTodoData = {
      userId: parseInt(userId, 10),
      content: input,
      categoryId: selectedCategory,
      order:
        todos.length > 0
          ? LexoRank.parse(todos[todos.length - 1].order)
              .genNext()
              .toString()
          : LexoRank.middle().toString(),
    };

    addInboxTodo(newTodoData);
    setInput('');
  };

  useEffect(() => {
    if (isInboxTodoQuerySuccess) {
      setInboxTodos(inboxTodoData);
      let filteredTodos = inboxTodoData.filter(
        todo => todo.categoryId === selectedCategory,
      );
      setInboxCurrentTodos(filteredTodos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInboxTodoQuerySuccess, inboxTodoData, selectedCategory]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        style={{ backgroundColor: 'white' }}
        data={inboxCurrentTodos}
        renderItem={renderTodo}
        onDragEnd={handleDragEnd}
        keyExtractor={item => item.id.toString()}
        onScroll={event => handleScroll(INBOXVIEW_SCROLL_EVENT, userId, event)}
        scrollEventThrottle={DEFAULT_SCROLL_EVENT_THROTTLE}
      />
      <Input
        placeholder="새로운 할 일을 입력해주세요"
        value={input}
        onChangeText={nextInput => {
          setInput(nextInput);
        }}
        autoFocus={false}
        onSubmitEditing={handleSubmit}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default InboxTodos;
