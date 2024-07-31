import CategoryScroll from '@/components/CategoryScroll';
import CategoryTodos from '@/components/CategoryTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const TodayView = () => {
  return (
    <CategoryProvider>
      <DateProvider>
        <SafeAreaView style={styles.container}>
          <WeeklyCalendar />
          <CategoryScroll />
          <CategoryTodos />
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
