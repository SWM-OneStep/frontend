// useCategoriesQuery.js
import { Api } from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async (accessToken, userId) => {
  const data = await Api.getCategory(accessToken, userId);
  return data;
};

const useCategoriesQuery = (accessToken, userId, onSuccess) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(accessToken, userId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
    onError: async error => {
      queryClient.invalidateQueries(QUERY_KEY);
      console.log(error);
    },
  });
};

export default useCategoriesQuery;
