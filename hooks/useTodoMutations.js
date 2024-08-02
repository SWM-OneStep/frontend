import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TODO_QUERY_KEY from './useTodoQuery';

// 생성 (Add Todo)
const addTodoFetcher = async ({ accessToken, todoData }) => {
  console.log('addTodoFetcher todoData', todoData);
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
const updateTodoFetcher = async (accessToken, todoId, updatedData) => {
  const data = await Api.updateTodo(accessToken, todoId, updatedData);
  return data;
};

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    },
    onError: error => {
      console.error('Error editing todo:', error);
    },
  });
};

// 삭제 (Delete Todo)
const deleteTodoFetcher = async (accessToken, todoId) => {
  const data = await Api.deleteTodo(accessToken, todoId);
  return data;
};

export const useTodoDeleteMutation = onSuccess => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
      if (onSuccess) onSuccess();
    },
    onError: error => {
      console.error('Error deleting todo:', error);
    },
  });
};
