// useCategoriesQuery.js
import useApi from '@/utils/useApi';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const QUERY_KEY = '/category';

const useFetcher = async (accessToken, userId) => {
  const { useGetCategory } = useApi();
  return useGetCategory(accessToken, userId);
};

const useCategoriesQuery = (accessToken, userId, onSuccess) => {
  const handleUseFetcher = useCallback(useFetcher, [useFetcher]);
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => handleUseFetcher(),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useCategoriesQuery;
