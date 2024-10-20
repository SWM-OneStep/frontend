import CategoryScroll from '@/components/CategoryScroll';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { handleLogEvent, TODAYVIEW_VIEW_EVENT } from '@/utils/logEvent';
import React, { Suspense, useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DailyTodos from '../../components/todayView/dailyTodos/DailyTodos';
import ErrorFallback from '../../components/common/molecules/ErrorFallback';
import LoadingIndicator from '../../components/common/molecules/LoadingIndicator';
import { ErrorBoundary } from 'react-error-boundary';

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
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingIndicator />}>
              <CategoryScroll />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingIndicator />}>
              <DailyTodos />
            </Suspense>
          </ErrorBoundary>
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
