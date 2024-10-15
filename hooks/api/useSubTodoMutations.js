import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

const addSubTodoFetcher = async ({ accessToken, todoData }) => {
  const data = await Api.addSubTodo(accessToken, todoData);
  return data;
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const updateSubTodoFetcher = async ({ accessToken, updatedData }) => {
  const data = await Api.updateSubTodo({
    accessToken: accessToken,
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

const deleteSubTodoFetcher = async ({ accessToken, subTodoId }) => {
  const data = await Api.deleteSubTodo({
    accessToken: accessToken,
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
