import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import HeaderMenu from '@/components/HeaderMenu';

const MainHeader = () => {
  return (
    <Layout style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
      </View>
      <HeaderMenu />
    </Layout>
  );
};

//TODO:
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
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

export default MainHeader;
