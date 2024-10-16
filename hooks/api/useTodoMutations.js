import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TODO_QUERY_KEY } from './useTodoQuery';

// 생성 (Add Todo)
const addTodoFetcher = async ({ todoData }) => {
  const data = await Api.addTodo(todoData);
  return data;
};

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    },
  });
};

// 수정 (Update Todo)
const updateTodoFetcher = async ({ updatedData }) => {
  const data = await Api.updateTodo({
    updateData: updatedData,
  });
  return data;
};

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    },
  });
};

// 삭제 (Delete Todo)
const deleteTodoFetcher = async ({ todoId }) => {
  const data = await Api.deleteTodo({ todoId });
  return data;
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(TODO_QUERY_KEY),
  });
};
