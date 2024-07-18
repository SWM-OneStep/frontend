import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import moment from 'moment';

const TodayView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  return (
    <View style={styles.container}>
      <WeeklyCalendar
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
      />
    </View>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
