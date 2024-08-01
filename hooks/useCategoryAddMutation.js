import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY as categoryQueryKey } from './useCategoriesQuery';

const fetcher = async ({ accessToken, addCategoryData }) => {
  const data = await Api.addCategory(accessToken, addCategoryData);
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
