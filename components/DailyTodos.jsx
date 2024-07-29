import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, List } from '@ui-kitten/components';
import { Fragment, useContext, useState } from 'react';
import DailyTodo from './DailyTodo';

const DailyTodos = ({ todos }) => {
  const [input, setInput] = useState('');
  const addTodo = useTodoStore(state => state.addTodo);
  const { selectedCategory } = useContext(CategoryContext);
  const renderTodo = ({ item, index }) => {
    return <DailyTodo item={item} key={index} />;
  };
  const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    const startDate = date.split('T')[0];
    const endDate = date.split('T')[0];
    addTodo(startDate, endDate, input, selectedCategory);
    setInput('');
  };

  return (
    <Fragment>
      <List
        data={todos}
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
