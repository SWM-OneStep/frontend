import { Api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export const SUBTODO_QUERY_KEY = '/sub';

// 생성 (Add Todo)
const addSubTodoFetcher = async ({ accessToken, todoData }) => {
  const data = await Api.addSubTodo(accessToken, todoData);
  return data;
};

export const useSubTodoAddMutation = () => {
  return useMutation({
    mutationFn: addSubTodoFetcher,
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
  return useMutation({
    mutationFn: updateSubTodoFetcher,
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
  return useMutation({
    mutationFn: deleteSubTodoFetcher,
    onError: error => {
      console.error('Error deleting todo:', error);
    },
  });
};
