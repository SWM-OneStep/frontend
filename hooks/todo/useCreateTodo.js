import { useState } from 'react';
import { useTodoAddMutation } from '@/hooks/api/useTodoMutations';
import useTodoStore from '@/contexts/TodoStore';
import { LexoRank } from 'lexorank';

const useCreateTodo = (userId, accessToken, selectedCategory, selectedDate) => {
  const [input, setInput] = useState('');
  const { mutate: addTodo } = useTodoAddMutation();
  const todos = useTodoStore.getState().todos;
  //TODO: react query와 zustand를 합쳐서 todo 상태관리를 하도록 수정해야 함
  const handleSubmit = () => {
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: selectedDate.format('YYYY-MM-DD'),
      endDate: selectedDate.format('YYYY-MM-DD'),
      content: input,
      categoryId: selectedCategory,
      order:
        todos.length > 0
          ? LexoRank.parse(todos[todos.length - 1].order)
              .genNext()
              .toString()
          : LexoRank.middle().toString(),
    };

    addTodo({ accessToken, todoData: newTodoData });
    setInput('');
  };

  return { input, setInput, handleSubmit };
};

export default useCreateTodo;
