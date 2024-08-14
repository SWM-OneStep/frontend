// useTodosQuery.js
import Api from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';

export const TODO_QUERY_KEY = '/todos';

const fetcher = async (accessToken, userId) => {
  const { fetchTodos } = Api();
  return fetchTodos(accessToken, userId);
};

const useTodosQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: fetcher,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useTodosQuery;
