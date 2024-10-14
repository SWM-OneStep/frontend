const path = require('path');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const config = getSentryExpoConfig(__dirname);
config.resolver.unstable_conditionNames = [
  'browser',
  'require',
  'react-native',
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const defaultResolveResult = context.resolveRequest(
    context,
    moduleName,
    platform,
  );

  if (
    process.env.STORYBOOK_ENABLED !== 'true' &&
    defaultResolveResult?.filePath?.includes?.('.storybook/')
  ) {
    return {
      type: 'empty',
    };
  }

  return defaultResolveResult;
};

module.exports = withStorybook(config, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});
