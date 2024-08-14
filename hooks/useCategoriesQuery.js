// useCategoriesQuery.js
import Api from '@/utils/Api';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async (userId, headerFunction) => {
  const { getCategory } = Api();
  return getCategory(userId, headerFunction);
};

const useCategoriesQuery = (userId, headerFunction, onSuccess) => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(userId, headerFunction),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  });
};

export default useCategoriesQuery;
