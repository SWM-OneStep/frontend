import { CategoryContext } from '@/contexts/CategoryContext';
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
  const handleSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    addTodo(startDate, endDate, input, selectedCategory);
    setInput('');
  };

  return (
    <>
      <List
        data={todos}
        renderItem={renderTodo}
        // contentContainerStyle=
        ListFooterComponent={
          <Input
            placeholder="Place your Text"
            value={input}
            onChangeText={nextInput => {
              console.log(nextInput);
              setInput(nextInput);
            }}
            onFocus={console.log('focused')}
            onBlur={console.log('blurred')}
            onSubmitEditing={handleSubmit}
          />
        }
        ListFooterComponentStyle={{ paddingTop: 0 }}
      />
    </>
  );
};

export default DailyTodos;
