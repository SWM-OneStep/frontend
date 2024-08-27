import Api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// eslint-disable-next-line import/namespace
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
