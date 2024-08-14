import { default as Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

const addSubTodoFetcher = async ({ todoData, headerFunction }) => {
  const { addSubTodo } = Api();
  return addSubTodo(todoData, headerFunction);
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const updateSubTodoFetcher = async (updatedData, headerFunction) => {
  const { updateSubTodo } = Api();
  return updateSubTodo(updatedData, headerFunction);
};

export const useSubTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const deleteSubTodoFetcher = async (subTodoId, headerFunction) => {
  const { deleteSubTodo } = Api();
  return deleteSubTodo(subTodoId, headerFunction);
};

export const useSubTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};
