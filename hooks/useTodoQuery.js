// useTodosQuery.js
import { Api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const TODO_QUERY_KEY = '/todos';

const fetcher = async (accessToken, userId) => {
  const data = await Api.fetchTodos(accessToken, userId);
  return data;
};

const useTodosQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
    staleTime: 0,
  });
};

export const useTodosQueryByNotification = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    onSuccess: onSuccess,
    keepPreviousData: true,
    staleTime: 0,
    enabled: false,
  });
};

export default useTodosQuery;
