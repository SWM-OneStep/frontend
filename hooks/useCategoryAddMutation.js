import Api from '@/utils/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const fetcher = ({ accessToken, addCategoryData }) => {
  const { addCategory } = Api();
  return addCategory(accessToken, addCategoryData);
};

const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export default useCategoryAddMutation;
