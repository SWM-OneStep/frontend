import CategoryScroll from '@/components/CategoryScroll';
import CategoryTodos from '@/components/CategoryTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import moment from 'moment';
import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

const TodayView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <SafeAreaView style={styles.container}>
      <WeeklyCalendar
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
      />
      <CategoryScroll />
      <KeyboardAvoidingView>
        <CategoryTodos />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
