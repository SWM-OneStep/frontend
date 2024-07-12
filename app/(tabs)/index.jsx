import { View, StyleSheet } from 'react-native';
import React from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';

const TodayView = () => {
  return (
    <View style={styles.container}>
      <WeeklyCalendar />
    </View>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
