import { Api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetcher = async ({ accessToken, addCategoryData }) => {
  const data = await Api.addCategory(accessToken, addCategoryData);
  return data;
};

const useCategoryAddMutation = () => {
  return useMutation({
    mutationFn: fetcher,
  });
};

export default useCategoryAddMutation;
