import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Layout,
  MenuItem,
  OverflowMenu,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const HeaderMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const onItemSelect = useCallback(index => {
    setSelectedIndex(index);
    setVisible(false);
  }, []);

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
    <Layout level="1">
      <OverflowMenu
        anchor={RightIcon}
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem
          title="카테고리 관리"
          onPress={() => {
            console.log('카테고리 관리');
            setVisible(false); // 메뉴 항목 선택 후 메뉴를 닫습니다.
          }}
        />
        <MenuItem
          title="설정"
          onPress={() => {
            console.log('설정');
            setVisible(false); // 메뉴 항목 선택 후 메뉴를 닫습니다.
          }}
        />
      </OverflowMenu>
    </Layout>
  );
};

export default HeaderMenu;
