// useCategoriesQuery.js
import Api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const api = Api.getInstance();

const fetcher = async userId => {
  return api.getCategory(userId);
};

const useCategoriesQuery = userId => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
  });
};

export default useCategoriesQuery;
