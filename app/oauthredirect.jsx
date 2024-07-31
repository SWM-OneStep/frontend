import { useRouter } from 'expo-router';
import { useEffect } from 'react';
const Oauthredirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  });
  return null;
};

export default Oauthredirect;
