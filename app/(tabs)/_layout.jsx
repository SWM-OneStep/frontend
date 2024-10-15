import '@/locales/index';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const todayIcon = ({ color, size }) => (
  <MaterialIcons name="today" color={color} size={size} />
);

const inboxIcon = ({ color, size }) => (
  <MaterialIcons name="inbox" color={color} size={size} />
);

const TabLayout = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true, // 키보드가 활성화될 때 탭 바 숨기기
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('views.tabs/_layout.today'),
          tabBarIcon: todayIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inboxView"
        options={{
          title: t('views.tabs/_layout.inbox'),
          tabBarIcon: inboxIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
