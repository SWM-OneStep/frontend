import CategoryScroll from '@/components/CategoryScroll';
import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { handleLogEvent, TODAYVIEW_VIEW_EVENT } from '@/utils/logEvent';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import MainHeader from '@/components/MainHeader';

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
          <MainHeader />
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
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    backgroundColor: 'white',
  },
});
