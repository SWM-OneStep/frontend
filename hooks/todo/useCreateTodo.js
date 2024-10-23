import { useState } from 'react';
import { useTodoAddMutation } from '@/hooks/api/useTodoMutations';
const useCreateTodo = (userId, selectedCategory, selectedDate) => {
  const [input, setInput] = useState('');
  const { mutate: addTodo } = useTodoAddMutation();

  //TODO: react query와 zustand를 합쳐서 todo 상태관리를 하도록 수정해야 함
  const handleSubmit = () => {
    const newTodoData = {
      date: selectedDate.format('YYYY-MM-DD'),
      content: input,
      categoryId: selectedCategory,
    };

    addTodo({ todoData: newTodoData });
    setInput('');
  };

  return { input, setInput, handleSubmit };
};

export default useCreateTodo;
