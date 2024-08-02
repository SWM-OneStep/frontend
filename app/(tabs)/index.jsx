import CategoryScroll from '@/components/CategoryScroll';
import DailyTodos from '@/components/DailyTodos';
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
          <DailyTodos />
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
