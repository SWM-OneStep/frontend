import CategoryScroll from '@/components/CategoryScroll';
import CategoryTodos from '@/components/CategoryTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';

const TodayView = () => {
  return (
    <CategoryProvider>
      <DateProvider>
        <SafeAreaView style={styles.container}>
          <WeeklyCalendar />
          <CategoryScroll />
          {/* <CategoryTodos /> */}
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
