import Constants from 'expo-constants';

const getEnv = key => Constants.expoConfig?.extra?.[key];

export const env = {
  BASE_URL: getEnv('BASE_URL'),
  SENTRY_MODE: getEnv('SENTRY_MODE'),
};

export const getSentryConfig = () => {
  switch (env.SENTRY_MODE) {
    case 'production':
      return {
        tracesSampleRate: 1.0,
        _experiments: {
          profilesSampleRate: 1.0,
          replaysSessionSampleRate: 1.0,
          replaysOnErrorSampleRate: 1.0,
        },
      };
    case 'staging':
      return {
        tracesSampleRate: 1.0,
        _experiments: {
          profilesSampleRate: 1.0,
          replaysSessionSampleRate: 1.0,
          replaysOnErrorSampleRate: 1.0,
        },
      };
  }
};
