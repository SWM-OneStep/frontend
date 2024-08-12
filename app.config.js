let Config = {
  BASE_URL: 'https://10.0.0.2:8000',
  SENTRY_MODE: 'development',
};

if (process.env.APP_MODE === 'production') {
  Config.BASE_URL = 'https://stepby.one';
  Config.SENTRY_MODE = 'production';
} else if (process.env.APP_MODE === 'development') {
  Config.BASE_URL = 'https://dev.stepby.one';
}
module.exports = {
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
      googleServicesFile: './android/app/google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.safezone.onestep',
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
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/63f6bbd9-1594-44b3-b161-0e0051413ef0',
    },
  },
};
