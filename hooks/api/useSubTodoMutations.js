import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

const addSubTodoFetcher = async ({ todoData }) => {
  const data = await Api.addSubTodo(todoData);
  return data;
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const updateSubTodoFetcher = async ({ updatedData }) => {
  const data = await Api.updateSubTodo({
    updatedData: updatedData,
  });
  return data;
};

export const useSubTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const deleteSubTodoFetcher = async ({ subTodoId }) => {
  const data = await Api.deleteSubTodo({
    subTodoId: subTodoId,
  });
  return data;
};

export const useSubTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};
