import CategoryScroll from '@/components/CategoryScroll';
import InboxTodos from '@/components/InboxTodos';
import CategoryProvider from '@/contexts/CategoryContext';
import DateProvider from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { handleLogEvent, INBOXVIEW_VIEW_EVENT } from '@/utils/logEvent';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';

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
          <StatusBar
            backgroundColor="#FFFFFF" // 원하는 배경색으로 변경하세요
            barStyle="dark-content" // 또는 "light-content"
          />
          <View style={[styles.content]}>
            <CategoryScroll />
            <InboxTodos />
          </View>
        </SafeAreaView>
      </DateProvider>
    </CategoryProvider>
  );
};

export default InboxView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
