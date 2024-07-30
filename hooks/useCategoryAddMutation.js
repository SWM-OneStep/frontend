import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY as categoryQueryKey } from './useCategoriesQuery';
import { Api } from '@/utils/api';

const fetcher = async (accessToken, categoryData) => {
  const data = await Api.addCategory(accessToken, categoryData);
  return data;
};

const useCategoryAddMutation = onSuccess => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries(categoryQueryKey);
      onSuccess();
    },
  });
};

export default useCategoryAddMutation;
