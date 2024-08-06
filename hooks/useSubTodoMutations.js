import { Api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';

export const SUBTODO_QUERY_KEY = '/sub';

// 생성 (Add Todo)
const addSubTodoFetcher = async ({ accessToken, todoData }) => {
  const data = await Api.addSubTodo(accessToken, todoData);
  return data;
};

export const useSubTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(SUBTODO_QUERY_KEY),
    onError: error => {
      console.error('Error adding todo:', error);
    },
  });
};

// 수정 (Update Todo)
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
    onError: error => {
      console.error('Error editing todo:', error);
    },
  });
};

// 삭제 (Delete Todo)
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
    onError: error => {
      console.error('Error deleting todo:', error);
    },
  });
};
