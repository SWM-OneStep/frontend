import { CategoryContext } from '@/contexts/CategoryContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import { useTodoAddMutation } from '@/hooks/useTodoMutations';
import { Input, List } from '@ui-kitten/components';
import { Fragment, useContext, useState } from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import DailyTodo from './DailyTodo';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { mutate: addTodo } = useTodoAddMutation({
    onSuccess: () => {
      console.log('Todo added successfully');
    },
  });

  const currentTodos = useTodoStore(state => state.currentTodos);

  const renderTodo = ({ item, drag, isActive }) => {
    <ScaleDecorator>
      <DailyTodo item={item} drag={drag} isActive={isActive} />
    </ScaleDecorator>;
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: new Date(),
      endDate: new Date(),
      content: input,
      category: selectedCategory.id,
    };

    console.log('handleSubmit newTodoData', newTodoData);
    addTodo(accessToken, newTodoData);
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
