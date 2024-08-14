// useCategoriesQuery.js
import Api from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';

export const INBOX_QUERY_KEY = '/inbox';

const fetcher = async (accessToken, userId) => {
  const { getInboxTodo } = Api();
  return getInboxTodo(accessToken, userId);
};

const useInboxTodoQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: fetcher,
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useInboxTodoQuery;
