let Config = {
  BASE_URL: 'http://10.0.2.2:8000',
  SENTRY_MODE: 'development',
};

if (
  process.env.APP_MODE === 'production' ||
  process.env.EXPO_PUBLIC_APP_MODE === 'production'
) {
  Config.BASE_URL = 'https://stepby.one';
  Config.SENTRY_MODE = 'production';
} else if (
  process.env.APP_MODE === 'development' ||
  process.env.EXPO_PUBLIC_APP_MODE === 'development'
) {
  Config.BASE_URL = 'https://dev.stepby.one';
}
module.exports = {
  expo: {
    name: 'onestep',
    slug: 'onestep',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/Group 3.png',
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
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ||
        './android/app/google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/Group 3.png',
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
