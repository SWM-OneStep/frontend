// useCategoriesQuery.js
import { Api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const INBOX_QUERY_KEY = '/inbox';

const fetcher = async (accessToken, userId) => {
  const data = await Api.getInboxTodo(accessToken, userId);
  return data;
};

const useInboxTodoQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
    onError: error => {
      console.log('error', error);
    },
  });
};

export default useInboxTodoQuery;