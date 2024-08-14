// useCategoriesQuery.js
import Api from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async (accessToken, userId) => {
  const { getCategory } = Api();
  return getCategory(accessToken, userId);
};

const useCategoriesQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useCategoriesQuery;
