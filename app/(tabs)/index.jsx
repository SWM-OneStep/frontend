import { View, StyleSheet } from 'react-native';
import React from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import DailyTodo from '@/components/DailyTodo';

const TodayView = () => {
  return (
    <View style={styles.container}>
      <WeeklyCalendar />
      <DailyTodo />
    </View>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
