// useCategoriesQuery.js
import Api from '@/utils/Api';
import { useQuery } from '@tanstack/react-query';

export const INBOX_QUERY_KEY = '/inbox';

const fetcher = async (userId, headerFunction) => {
  const { getInboxTodo } = Api();
  return getInboxTodo(userId, headerFunction);
};

const useInboxTodoQuery = (userId, headerFunction) => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => fetcher(userId, headerFunction),
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
  });
};

export default useInboxTodoQuery;
