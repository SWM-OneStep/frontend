import '@/locales/index';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  useTheme,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

const HeaderMenu = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const toggleMenu = useCallback(() => {
    setVisible(true);
  }, []);

  const RightIcon = useCallback(
    () => (
      <TouchableOpacity onPress={() => toggleMenu()}>
        <Icon
          name="more-horizontal-outline"
          fill={theme['text-basic-color']}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    ),
    [theme, toggleMenu],
  );

  return (
    <Layout>
      <OverflowMenu
        anchor={RightIcon}
        visible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem
          title={t('components.headerMenu.manageCategory')}
          onPress={() => {
            router.push('/categoryListView');
            setVisible(false); // 메뉴 항목 선택 후 메뉴를 닫습니다.
          }}
        />
        <MenuItem
          title={t('components.headerMenu.settings')}
          onPress={() => {
            router.push('/settingsView');
            setVisible(false); // 메뉴 항목 선택 후 메뉴를 닫습니다.
          }}
        />
      </OverflowMenu>
    </Layout>
  );
};

export default HeaderMenu;
