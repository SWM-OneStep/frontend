import Api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TODO_QUERY_KEY } from './useTodoQuery';

const api = Api.getInstance();

// 생성 (Add Todo)
const addTodoFetcher = async todoData => {
  return api.addTodo(todoData);
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
const updateTodoFetcher = async updatedData => {
  return api.updateTodo(updatedData);
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
const deleteTodoFetcher = async todoId => {
  return api.deleteTodo(todoId);
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(TODO_QUERY_KEY),
  });
};
