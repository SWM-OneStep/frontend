// useCategoriesQuery.js
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/utils/api';

export const QUERY_KEY = '/category';

const fetcher = async (accessToken, userId) => {
  const data = await Api.getCategory(accessToken, userId);
  return data;
};

const useCategoriesQuery = (accessToken, userId, onSuccess) => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
    onError: error => {
      console.log(error);
    },
  });
};

export default useCategoriesQuery;
