import CategoryScroll from '@/components/CategoryScroll';
import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { handleLogEvent, TODAYVIEW_VIEW_EVENT } from '@/utils/logEvent';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const TodayView = () => {
  const { userId } = useContext(LoginContext);
  handleLogEvent(TODAYVIEW_VIEW_EVENT, {
    time: new Date().toISOString(),
    userId: userId,
  });
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
  container: { flex: 1, paddingTop: 10, backgroundColor: 'white' },
});
