import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import useInboxTodoQuery from '@/hooks/useInboxTodoQuery';
import { useTodoAddMutation } from '@/hooks/useTodoMutations';
import Api from '@/utils/api';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  handleScroll,
} from '@/utils/handleScroll';
import { INBOXVIEW_SCROLL_EVENT } from '@/utils/logEvent';
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
  const { useMetadata } = Api();
  const {
    isLoading,
    error,
    data: inboxTodoData,
    isSuccess: isInboxTodoQuerySuccess,
  } = useInboxTodoQuery(userId, useMetadata);
  const setInboxTodos = useTodoStore(state => state.setInboxTodos);
  const inboxCurrentTodos = useTodoStore(state => state.inboxCurrentTodos);
  const setInboxCurrentTodos = useTodoStore(
    state => state.setInboxCurrentTodos,
  );
  const { mutate: addInboxTodo } = useTodoAddMutation();

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

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <View>
        <InboxTodo item={item} drag={drag} isActive={isActive} />
      </View>
    );
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

    addInboxTodo(newTodoData, useMetadata);
    setInput('');
  };
  return (
    <Fragment>
      <List
        data={inboxCurrentTodos}
        renderItem={renderTodo}
        ListFooterComponentStyle={{ paddingTop: 0, flex: 1 }}
        onScroll={event => handleScroll(INBOXVIEW_SCROLL_EVENT, userId, event)}
        scrollEventThrottle={DEFAULT_SCROLL_EVENT_THROTTLE}
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
