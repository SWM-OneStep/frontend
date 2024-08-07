import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export const AntDesignIconsPack = {
  name: 'antDesign',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = name => ({
  toReactElement: props => AntDesignIcon({ name, ...props }),
});

function AntDesignIcon({ name, style }) {
  if (!style) {
    return null;
  }

  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
