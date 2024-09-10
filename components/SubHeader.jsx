import React from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

const Header = ({ title, logo }) => {
  const theme = useTheme();

  return (
    <Layout style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text category="h1" style={styles.title}>
        {title}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 9999,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
