import { useState } from 'react';

const useDailyTodo = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  const [generatedSubTodos, setGeneratedSubTodos] = useState([]);

  return {
    isEditing,
    setIsEditing,
    subTodoInputActivated,
    setSubTodoInputActivated,
    generatedSubTodos,
    setGeneratedSubTodos,
  };
};

export default useDailyTodo;
