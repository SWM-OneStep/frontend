import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, List } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import DailyTodo from './DailyTodo';

const DailyTodos = ({ todos }) => {
  const addTodo = useTodoStore(state => state.addTodo);

  const [input, setInput] = useState('');
  const { selectedCategory } = useContext(CategoryContext);

  const renderTodo = ({ item, index }) => {
    return <DailyTodo item={item} />;
  };
  const handleSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    addTodo(startDate, endDate, input, selectedCategory);
    setInput('');
  };

  return (
    <List
      data={todos}
      renderItem={renderTodo}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListFooterComponent={
        <Input
          placeholder="Place your Text"
          value={input}
          onChangeText={nextInput => setInput(nextInput)}
          onSubmitEditing={handleSubmit}
        />
      }
      ListFooterComponentStyle={{ paddingTop: 0, paddingBottom: 125 }}
    />
  );
};

export default DailyTodos;
