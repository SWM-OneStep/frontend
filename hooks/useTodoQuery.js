// useTodosQuery.js

import Api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const TODO_QUERY_KEY = '/todos';

const api = Api.getInstance();

const fetcher = async userId => {
  return api.fetchTodos(userId);
};

const useTodosQuery = userId => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => fetcher(userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
  });
};

export default useTodosQuery;
