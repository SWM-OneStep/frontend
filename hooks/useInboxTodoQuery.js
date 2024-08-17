// useCategoriesQuery.js
import Api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const INBOX_QUERY_KEY = '/inbox';

const api = Api.getInstance();

const fetcher = async userId => {
  return api.getInboxTodo(userId);
};

const useInboxTodoQuery = userId => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => fetcher(userId),
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
  });
};

export default useInboxTodoQuery;
