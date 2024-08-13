import useApi from '@/utils/useApi';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const useFetcher = ({ accessToken, addCategoryData }) => {
  const { useAddCategory } = useApi();
  return useAddCategory(accessToken, addCategoryData);
};

const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useFetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export default useCategoryAddMutation;
