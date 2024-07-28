import { useRouter } from 'expo-router';

const Oauthredirect = () => {
  const router = useRouter();
  router.replace('(tabs)');
  return null;
};

export default Oauthredirect;
