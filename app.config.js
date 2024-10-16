let Config = {
  BASE_URL: '',
  SENTRY_MODE: '',
};

let googleServiceJson = null;
let googleServicePlist = null;

switch (process.env.APP_MODE || process.env.EXPO_PUBLIC_APP_MODE) {
  case 'production':
    Config.BASE_URL = 'https://stepby.one';
    Config.SENTRY_MODE = 'production';
    googleServiceJson =
      process.env.GOOGLE_SERVICES_PRODUCTION_JSON ||
      './google-services.production.json';
    googleServicePlist =
      process.env.GOOGLE_SERVICES_PRODUCTION_PLIST ||
      './GoogleService-Info.production.plist';
    break;

  case 'staging':
    Config.BASE_URL = 'https://dev.stepby.one';
    Config.SENTRY_MODE = 'staging';
    googleServiceJson =
      process.env.GOOGLE_SERVICES_STAGING_JSON ||
      './google-services.staging.json';
    googleServicePlist =
      process.env.GOOGLE_SERVICES_STAGING_PLIST ||
      './GoogleService-Info.staging.plist';
    break;

  case 'development':
    Config.BASE_URL = 'https://dev.stepby.one';
    Config.SENTRY_MODE = 'development';
    googleServiceJson = './google-services.development.json';
    googleServicePlist = './GoogleService-Info.development.plist';
    break;

  case 'local':
    Config.BASE_URL = 'http://10.0.2.2:8000';
    Config.SENTRY_MODE = 'development';
    googleServiceJson = './google-services.development.json';
    googleServicePlist = './GoogleService-Info.development.plist';

    //TODO: 생각해보니 local이나 dev일 때는 굳이 로깅할 필요도 없고 firebase 설정할 필요가 있나
    break;

  default:
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.safezone.onestep',
      versionCode: 4,
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
    //TODO: pdofile 수정 플러그인 추가
    plugins: [
      'expo-router',
      '@react-native-firebase/app',
      '@react-native-firebase/crashlytics',
      'expo-build-properties',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
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
if (googleServicePlist) {
  expoConfig.expo.ios.googleServicesFile = googleServicePlist;
}

module.exports = expoConfig;
