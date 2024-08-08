import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          title: 'Today',
          tabBarIcon: todayIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inboxView"
        options={{
          title: 'Inbox',
          tabBarIcon: inboxIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
