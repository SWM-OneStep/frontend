// useTodosQuery.js
import Api from '@/utils/Api';
import { useQuery } from '@tanstack/react-query';

export const TODO_QUERY_KEY = '/todos';

const fetcher = async (userId, headerFunction) => {
  const { fetchTodos } = Api();
  return fetchTodos(userId, headerFunction);
};

const useTodosQuery = (userId, headerFunction) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => fetcher(userId, headerFunction),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
  });
};

export default useTodosQuery;
