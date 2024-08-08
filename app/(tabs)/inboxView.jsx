import CategoryScroll from '@/components/CategoryScroll';
// eslint-disable-next-line import/namespace
import InboxTodos from '@/components/InboxTodos';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { handleLogEvent, INBOXVIEW_VIEW_EVENT } from '@/utils/logEvent';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const InboxView = () => {
  const { userId } = useContext(LoginContext);
  handleLogEvent(INBOXVIEW_VIEW_EVENT, {
    time: new Date().toISOString(),
    userId: userId,
  });
  return (
    <CategoryProvider>
      <DateProvider>
        <SafeAreaView style={styles.container}>
          <CategoryScroll />
          <InboxTodos />
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default InboxView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
