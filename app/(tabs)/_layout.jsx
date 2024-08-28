import messaging from '@react-native-firebase/messaging';
import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const todayIcon = ({ color, size }) => (
  <MaterialIcons name="today" color={color} size={size} />
);

const inboxIcon = ({ color, size }) => (
  <MaterialIcons name="inbox" color={color} size={size} />
);

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true, // 키보드가 활성화될 때 탭 바 숨기기
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '투데이',
          tabBarIcon: todayIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inboxView"
        options={{
          title: '인박스',
          tabBarIcon: inboxIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
