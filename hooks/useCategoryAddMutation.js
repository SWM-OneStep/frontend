import Api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const fetcher = ({ accessToken, addCategoryData }) => {
  const { addCategory } = Api();
  const data = addCategory(accessToken, addCategoryData);
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
