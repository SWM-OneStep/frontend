import { Api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async userId => {
  const data = await Api.getCategory(userId);
  return data;
};

const useCategoriesQuery = (userId, onSuccess) => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useCategoriesQuery;
