import React from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

const SubHeader = ({ title }) => {
  return (
    <Layout style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
      <Text category="h1" style={styles.title}>
        {title}
      </Text>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="plus-outline" />
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconContainer: {
    width: 35,
    height: 35,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SubHeader;
