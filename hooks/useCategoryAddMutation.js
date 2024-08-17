import Api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const api = Api.getInstance();

const fetcher = addCategoryData => {
  return api.addCategory(addCategoryData);
};

const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export default useCategoryAddMutation;
