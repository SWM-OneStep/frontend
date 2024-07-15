import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testLoginApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/auth/test/';

const TodayView = () => {
  useEffect(() => {
    const testApi = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(testLoginApi, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        await response.json();
      }
      testApi();
    };
  });

  return (
    <View style={styles.container}>
      <WeeklyCalendar />
    </View>
  );
};

export default TodayView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
