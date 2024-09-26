// useCategoriesQuery.js
import { useApi } from './useApi';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async (accessToken, userId) => {
  const data = await useApi.getCategory(accessToken, userId);
  return data;
};

const useCategoriesQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useCategoriesQuery;
