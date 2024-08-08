import CategoryScroll from '@/components/CategoryScroll';
// eslint-disable-next-line import/namespace
import InboxTodos from '@/components/InboxTodos';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const InboxView = () => {
  return (
    <CategoryProvider>
      <DateProvider>
        <SafeAreaView style={styles.container}>
          <CategoryScroll />
          <InboxTodos />
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default InboxView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
