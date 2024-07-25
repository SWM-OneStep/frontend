import { View, StyleSheet } from 'react-native';
import React from 'react';
import DragNDropPoC from '@/components/dragNDrop/DragNDropPoC';

const DragNDropView = () => {
  return (
    <View style={styles.container}>
      <DragNDropPoC />
    </View>
  );
};

export default DragNDropView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
