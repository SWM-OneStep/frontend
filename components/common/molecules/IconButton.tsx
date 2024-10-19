import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

// IconButton 컴포넌트
export const IconButton = ({ onPress, iconName, fill, ...props }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button]}>
      <Icon
        {...props}
        pack="eva"
        name={iconName}
        style={[styles.icon]}
        fill={fill}
      />
    </TouchableOpacity>
  );
};

// IconButtonContainer 컴포넌트
export const IconButtonContainer = ({
  children,
  direction = 'row',
  style = null,
}) => {
  return (
    <View style={[styles.container, { flexDirection: direction }, style]}>
      {children}
    </View>
  );
};

// 컴파운드 컴포넌트 패턴 적용
IconButton.IconButtonContainer = IconButtonContainer;

// 기본 스타일 정의
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000', // 기본 아이콘 색상
  },
});
