import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TodayView = () => {

  return (
    <View style={styles.container}>
      <WeeklyCalendar />
      <DailyTodos />
    </View>
  );

  
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
