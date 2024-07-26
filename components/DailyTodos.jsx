import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, List } from '@ui-kitten/components';
import { useContext, useState } from 'react';
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
    <List
      data={todos}
      renderItem={renderTodo}
      // contentContainerStyle=
      ListFooterComponent={
        <Input
          placeholder="Place your Text"
          value={input}
          onChangeText={nextInput => {
            setInput(nextInput);
          }}
          autoFocus={true}
          onSubmitEditing={handleSubmit}
        />
      }
      ListFooterComponentStyle={{ paddingTop: 0 }}
    />
  );
};

export default DailyTodos;
