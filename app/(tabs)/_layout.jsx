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
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: todayIcon,
        }}
      />
      <Tabs.Screen
        name="inboxView"
        options={{
          title: 'Inbox',
          tabBarIcon: inboxIcon,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
