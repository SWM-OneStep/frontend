import { Api } from '@/utils/api';
import { useRouter } from 'expo-router';
import { useMutation } from 'react-query';

const renewTokenFetcher = async ({
  accessToken: accessToken,
  refreshToken: refreshToken,
}) => {
  const data = Api.renewToken({ accessToken, refreshToken });
  return data;
};

export const useRenewTokenMutation = ({ onSuccess: onSuccess }) => {
  const router = useRouter();
  return useMutation({
    mutationFn: renewTokenFetcher,
    onSuccess: () => onSuccess(),
    onError: error => {
      router.replace('index');
    },
  });
};
