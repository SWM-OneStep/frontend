import { useRouter } from 'expo-router';
import { useEffect } from 'react';
const Oauthredirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('(tabs)');
  });
  return null;
};

export default Oauthredirect;
