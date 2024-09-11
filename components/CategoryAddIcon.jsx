import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import { router } from 'expo-router';

const CategoryAddIcon = () => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push('/categoryAddView')}
      style={styles.iconContainer}
    >
      <Icon
        name="plus-outline"
        fill={theme['text-basic-color']}
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryAddIcon;
