import { default as Api } from '@/utils/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

const addSubTodoFetcher = async ({ accessToken, todoData }) => {
  const { addSubTodo } = Api();
  return addSubTodo(accessToken, todoData);
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const updateSubTodoFetcher = async ({ accessToken, updatedData }) => {
  const { updateSubTodo } = Api();
  return updateSubTodo({
    accessToken: accessToken,
    updatedData: updatedData,
  });
};

export const useSubTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const deleteSubTodoFetcher = async ({ accessToken, subTodoId }) => {
  const { deleteSubTodo } = Api();
  return deleteSubTodo({ accessToken: accessToken, subTodoId: subTodoId });
};

export const useSubTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};
