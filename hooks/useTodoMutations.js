import { Api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

// 생성 (Add Todo)
const addTodoFetcher = async ({ accessToken, todoData }) => {
  const data = await Api.addTodo(accessToken, todoData);
  return data;
};

export const useTodoAddMutation = () => {
  return useMutation({
    mutationFn: addTodoFetcher,
    onError: error => {
      console.error('Error adding todo:', error);
    },
  });
};

// 수정 (Update Todo)
const updateTodoFetcher = async ({ accessToken, updatedData }) => {
  const data = await Api.updateTodo({
    accessToken: accessToken,
    updateData: updatedData,
  });
  return data;
};

export const useTodoUpdateMutation = () => {
  return useMutation({
    mutationFn: updateTodoFetcher,
    onError: error => {
      console.error('Error editing todo:', error);
    },
  });
};

// 삭제 (Delete Todo)
const deleteTodoFetcher = async ({ accessToken, todoId }) => {
  const data = await Api.deleteTodo({ accessToken, todoId });
  return data;
};

export const useTodoDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onError: error => {
      console.error('Error deleting todo:', error);
    },
  });
};
