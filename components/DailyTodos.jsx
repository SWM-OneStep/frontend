import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, List } from '@ui-kitten/components';
import { Fragment, useContext, useState } from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import DailyTodo from './DailyTodo';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { selectedCategory } = useContext(CategoryContext);

  // const addTodo = useTodoStore(state => state.addTodo);
  const currentTodos = useTodoStore(state => state.currentTodos);

  const renderTodo = ({ item, drag, isActive }) => {
    <ScaleDecorator>
      <DailyTodo item={item} drag={drag} isActive={isActive} />
    </ScaleDecorator>;
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    // const startDate = date.split('T')[0];
    // const endDate = date.split('T')[0];
    // addTodo(startDate, endDate, input, selectedCategory);
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
