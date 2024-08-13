import useApi from '@/utils/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const SUBTODO_QUERY_KEY = '/sub';

const useAddSubTodoFetcher = async ({ accessToken, todoData }) => {
  const { useAddSubTodo } = useApi();
  return useAddSubTodo(accessToken, todoData);
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  const handleUseAddSubTodo = useCallback(useAddSubTodoFetcher, [
    useAddSubTodoFetcher,
  ]);
  return useMutation({
    mutationFn: () => handleUseAddSubTodo(),
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const useUpdateSubTodoFetcher = async ({ accessToken, updatedData }) => {
  const { useUpdateSubTodo } = useApi();
  return useUpdateSubTodo({
    accessToken: accessToken,
    updatedData: updatedData,
  });
};

export const useSubTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  const handleUseUpdateSubTodoFetcher = useCallback(useUpdateSubTodoFetcher, [
    useUpdateSubTodoFetcher,
  ]);
  return useMutation({
    mutationFn: handleUseUpdateSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const useDeleteSubTodoFetcher = async ({ accessToken, subTodoId }) => {
  const { useDeleteSubTodo } = useApi();
  return useDeleteSubTodo({ accessToken: accessToken, subTodoId: subTodoId });
};

export const useSubTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  const handleUseDeleteSubTodoFetcher = useCallback(useDeleteSubTodoFetcher, [
    useDeleteSubTodoFetcher,
  ]);
  return useMutation({
    mutationFn: handleUseDeleteSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};
