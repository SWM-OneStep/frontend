import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import { useTodoAddMutation } from '@/hooks/useTodoMutations';
import TODO_QUERY_KEY from '@/hooks/useTodoQuery';
import { useQueryClient } from '@tanstack/react-query';
import { Input, List } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { Fragment, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import DailyTodo from './DailyTodo';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { mutate: addTodo, isSuccess } = useTodoAddMutation();
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const currentTodos = useTodoStore(state => state.currentTodos);

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <View>
        <DailyTodo item={item} drag={drag} isActive={isActive} />
      </View>
    );
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      content: input,
      categoryId: selectedCategory,
      order:
        currentTodos.length > 0
          ? LexoRank.parse(currentTodos[currentTodos.length - 1].order)
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
        autoFocus={true}
        onSubmitEditing={handleSubmit}
      />
      {/* </KeyboardAvoidingView> */}
    </Fragment>
  );
};

export default DailyTodos;
