// useTodosQuery.js
import useApi from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const TODO_QUERY_KEY = '/todos';

const useFetcher = async (accessToken, userId) => {
  const { useFetchTodos } = useApi();
  return useFetchTodos(accessToken, userId);
};

const useTodosQuery = (accessToken, userId, onSuccess) => {
  const handleUseFetcher = useCallback(useFetcher, [useFetcher]);
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => handleUseFetcher(accessToken, userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useTodosQuery;
