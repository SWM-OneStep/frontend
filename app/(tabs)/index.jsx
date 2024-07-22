import CategoryScroll from '@/components/CategoryScroll';
import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import moment from 'moment';
import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

const TodayView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <WeeklyCalendar
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
        />
        <CategoryScroll />
        <DailyTodos />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
