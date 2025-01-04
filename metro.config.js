const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Ensure Metro recognizes these asset extensions
    assetExts: [
      ...getDefaultConfig(__dirname).resolver.assetExts, 
      'jpg', 
      'jpeg', 
      'png', 
      'svg', 
      'gif'
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
