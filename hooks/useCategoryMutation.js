import { Api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from './useCategoriesQuery';

const addCategoryFetcher = async ({ accessToken, addCategoryData }) => {
  const data = await Api.addCategory(accessToken, addCategoryData);
  return data;
};

export const useCategoryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategoryFetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

const updateCategoryFetcher = async ({ accessToken, updatedData }) => {
  const data = await Api.updateCategory(accessToken, updatedData);
  return data;
};

export const useCategoryUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryFetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

const deleteCategoryFetcher = async categoryId => {
  const data = await Api.deleteCategory({ categoryId });
  return data;
};

export const useCategoryDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryFetcher,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};
