import Api from '@/utils/Api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const fetcher = ({ addCategoryData, headerFunction }) => {
  const { addCategory } = Api();
  return addCategory(addCategoryData, headerFunction);
};

const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export default useCategoryAddMutation;
