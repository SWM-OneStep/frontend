import useApi from '@/utils/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { TODO_QUERY_KEY } from './useTodoQuery';

// 생성 (Add Todo)
const useAddTodoFetcher = async ({ accessToken, todoData }) => {
  const { useAddTodo } = useApi();
  return useAddTodo(accessToken, todoData);
};

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();
  const handleUseAddTodoFetcher = useCallback(useAddTodoFetcher, [
    useAddTodoFetcher,
  ]);
  return useMutation({
    mutationFn: handleUseAddTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    },
  });
};

// 수정 (Update Todo)
const useUpdateTodoFetcher = async ({ accessToken, updatedData }) => {
  const { useUpdateTodo } = useApi();
  return useUpdateTodo({ accessToken: accessToken, updateData: updatedData });
};

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  const handleUseUpdateSubTodoFetcher = useCallback(useUpdateTodoFetcher, [
    useUpdateTodoFetcher,
  ]);
  return useMutation({
    mutationFn: handleUseUpdateSubTodoFetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    },
  });
};

// 삭제 (Delete Todo)
const useDeleteTodoFetcher = async ({ accessToken, todoId }) => {
  const { useDeleteTodo } = useApi();
  return useDeleteTodo({ accessToken: accessToken, todoId: todoId });
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  const handleUseDeleteTodoFetcher = useCallback(useDeleteTodoFetcher, [
    useDeleteTodoFetcher,
  ]);
  return useMutation({
    mutationFn: handleUseDeleteTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(TODO_QUERY_KEY),
  });
};
