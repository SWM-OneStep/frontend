// useCategoriesQuery.js
import useApi from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const INBOX_QUERY_KEY = '/inbox';

const useFetcher = async (accessToken, userId) => {
  const { useGetInboxTodo } = useApi();
  return useGetInboxTodo(accessToken, userId);
};

const useInboxTodoQuery = (accessToken, userId, onSuccess) => {
  const handleUseFetcher = useCallback(useFetcher, [useFetcher]);
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => handleUseFetcher(accessToken, userId),
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useInboxTodoQuery;
