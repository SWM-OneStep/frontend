import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import useInboxTodoQuery from '@/hooks/api/useInboxTodoQuery';
import { useTodoAddMutation } from '@/hooks/api/useTodoMutations';
import '@/locales/index';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  handleScroll,
} from '@/utils/handleScroll';
import { INBOXVIEW_SCROLL_EVENT } from '@/utils/logEvent';
import { Input } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InboxTodo from './InboxTodo';
import useTodosQuery from '@/hooks/api/useTodoQuery';

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
  const { data: allTodos } = useTodosQuery(userId);
  const setInboxTodos = useTodoStore(state => state.setInboxTodos);
  const inboxCurrentTodos = useTodoStore(state => state.inboxCurrentTodos);
  const setInboxCurrentTodos = useTodoStore(
    state => state.setInboxCurrentTodos,
  );
  const { mutate: addInboxTodo } = useTodoAddMutation();
  const { mutate: updateTodo } = useTodoAddMutation();
  const { t, i18n } = useTranslation();
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
      updatedData: updatedData,
    });
  };
  //TODO: order 순서 생각해보니까 이제 서버에서 하잖아? 일단 전체 투두에서 계속 마지막으로 붙이는 식으로 구현
  const handleSubmit = async () => {
    const newTodoData = {
      userId: parseInt(userId, 10),
      content: input,
      categoryId: selectedCategory,
      order:
        allTodos.length > 0
          ? LexoRank.parse(allTodos[allTodos.length - 1].order)
              .genNext()
              .toString()
          : LexoRank.middle().toString(),
    };

    addInboxTodo({ todoData: newTodoData });
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
        placeholder={t('components.dailyTodos.writeTodo')}
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
