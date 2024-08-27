import { default as Api } from '@/utils/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TODO_QUERY_KEY } from './useTodoQuery';

// 생성 (Add Todo)
const addTodoFetcher = async ({ accessToken, todoData }) => {
  const { addTodo } = Api();
  return addTodo(accessToken, todoData);
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
const updateTodoFetcher = async ({ accessToken, updatedData }) => {
  const { updateTodo } = Api();
  return updateTodo({ accessToken: accessToken, updateData: updatedData });
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
const deleteTodoFetcher = async ({ accessToken, todoId }) => {
  const { deleteTodo } = Api();
  return deleteTodo({ accessToken: accessToken, todoId: todoId });
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(TODO_QUERY_KEY),
  });
};
