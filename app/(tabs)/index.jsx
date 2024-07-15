import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

const TodayView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <WeeklyCalendar />
        <DailyTodos />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
