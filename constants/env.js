import Constants from 'expo-constants';

const getEnv = key => Constants.expoConfig?.extra?.[key];

export const env = {
  BASE_URL: getEnv('BASE_URL'),
  SENTRY_MODE: getEnv('SENTRY_MODE'),
};

console.log('env in env.js ', env);
console.log('test constnts in env.js ', Constants);
console.log('manifest  ', Constants.manifest2);
