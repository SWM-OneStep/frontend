import { Api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = '/category';

const fetcher = async userId => {
  const data = await Api.getCategory(userId);
  if (!data) {
    throw new Error('카테고리 데이터를 불러오는 데 실패했습니다.');
  }
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
    suspense: true,
    useErrorBoundary: true,
  });
};

export default useCategoriesQuery;
