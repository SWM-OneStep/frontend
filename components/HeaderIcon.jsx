import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

const HeaderIcon = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 35,
    height: 35,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 9999,
  },
});

export default HeaderIcon;
