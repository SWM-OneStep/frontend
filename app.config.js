let Config = {
  BASE_URL: '',
  SENTRY_MODE: '',
};

let googleServiceJson = null; //default

switch (process.env.APP_MODE || process.env.EXPO_PUBLIC_APP_MODE) {
  case 'production':
    Config.BASE_URL = 'https://stepby.one';
    Config.SENTRY_MODE = 'production';
    googleServiceJson =
      process.env.GOOGLE_SERVICES_PRODUCTION_JSON ||
      './google-services.production.json';
    break;

  case 'staging':
    Config.BASE_URL = 'https://dev.stepby.one';
    Config.SENTRY_MODE = 'staging';
    googleServiceJson =
      process.env.GOOGLE_SERVICES_STAGING_JSON ||
      './google-services.staging.json';
    break;

  case 'development':
    Config.BASE_URL = 'https://dev.stepby.one';
    Config.SENTRY_MODE = 'development';
    googleServiceJson = './google-services.development.json';
    break;

  case 'local':
    Config.BASE_URL = 'http://10.0.2.2:8000';
    Config.SENTRY_MODE = 'development';
    googleServiceJson = './google-services.development.json';
    break;

  default:
    throw new Error('Invalid APP_MODE');
}

const expoConfig = {
  expo: {
    name: 'onestep',
    slug: 'onestep',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.safezone.onestep',
      googleServicesFile: './ios/GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.safezone.onestep',
      versionCode: 1,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '63f6bbd9-1594-44b3-b161-0e0051413ef0',
      },
      ...Config,
    },
    scheme: 'onestep',
    owner: 'byungchanko',
    plugins: [
      'expo-router',
      '@react-native-firebase/app',
      '@react-native-firebase/crashlytics',
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: 'react-native',
          organization: 'ec5b082086ad',
        },
      ],
    ],
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/63f6bbd9-1594-44b3-b161-0e0051413ef0',
    },
  },
};

if (googleServiceJson) {
  expoConfig.expo.android.googleServicesFile = googleServiceJson;
}

module.exports = expoConfig;
