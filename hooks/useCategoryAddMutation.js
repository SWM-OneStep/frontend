import { Api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const fetcher = async ({ accessToken, addCategoryData }) => {
  const data = await Api.addCategory(accessToken, addCategoryData);
  return data;
};

const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export default useCategoryAddMutation;
