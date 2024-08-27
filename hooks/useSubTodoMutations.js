import Api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

const api = Api.getInstance();

const addSubTodoFetcher = async todoData => {
  return api.addSubTodo(todoData);
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const updateSubTodoFetcher = async updatedData => {
  return api.updateSubTodo(updatedData);
};

export const useSubTodoUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};

const deleteSubTodoFetcher = async subTodoId => {
  return api.deleteSubTodo(subTodoId);
};

export const useSubTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
  });
};
