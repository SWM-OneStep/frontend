// useCategoriesQuery.js
import { Api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react-native';

export const INBOX_QUERY_KEY = '/inbox';

const fetcher = async userId => {
  const data = await Api.getInboxTodo(userId);
  return data;
};

const useInboxTodoQuery = (userId, onSuccess) => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => fetcher(userId),
    // refetchInterval: 30000,
    // refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useInboxTodoQuery;
