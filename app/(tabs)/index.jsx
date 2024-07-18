import DailyTodos from '@/components/DailyTodos';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

const testLoginApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/auth/test/';

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
