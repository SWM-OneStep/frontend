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
  });
};

export default useTodosQuery;
