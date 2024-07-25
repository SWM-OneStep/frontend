import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input } from '@ui-kitten/components';
import { useContext, useState } from 'react';

const TodoInput = () => {
  const addTodo = useTodoStore(state => state.addTodo);
  const [input, setInput] = useState('');
  const handleSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    addTodo(startDate, endDate, input, selectedCategory);
    setInput('');
  };
  const { selectedCategory } = useContext(CategoryContext);

  return (
    <Input
      placeholder="Place your Text"
      value={input}
      onChangeText={nextInput => setInput(nextInput)}
      onSubmitEditing={handleSubmit}
    />
  );
};

export default TodoInput;
