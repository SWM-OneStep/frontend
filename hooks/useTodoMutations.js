import { default as Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TODO_QUERY_KEY } from './useTodoQuery';

// 생성 (Add Todo)
const addTodoFetcher = async (todoData, headerFunction) => {
  const { addTodo } = Api();
  return addTodo(todoData, headerFunction);
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
const updateTodoFetcher = async (updatedData, headerFunction) => {
  const { updateTodo } = Api();
  return updateTodo(updatedData, headerFunction);
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
const deleteTodoFetcher = async (todoId, headerFunction) => {
  const { deleteTodo } = Api();
  return deleteTodo(todoId, headerFunction);
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoFetcher,
    onSuccess: () => queryClient.invalidateQueries(TODO_QUERY_KEY),
  });
};
