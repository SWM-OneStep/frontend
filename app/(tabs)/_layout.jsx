import React from 'react';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
        }}
      />
      <Tabs.Screen
        name="inboxView"
        options={{
          title: 'Inbox',
        }}
      />
      <Tabs.Screen
        name="dragNDropView"
        option={{
          title: 'DragNDrop',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
