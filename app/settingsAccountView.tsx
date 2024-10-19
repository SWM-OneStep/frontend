// AccountInfoScreen.js
import React, { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { LoginContext } from '../contexts/LoginContext';

const SettingsAccountView = () => {
  const { userId, userName, email } = useContext(LoginContext);

  const handleDeleteAccount = () => {
    // 회원탈퇴 로직을 여기에 추가하세요
    console.log('회원탈퇴 클릭됨');
  };

  const handleEditProfile = () => {
    // 프로필 편집 로직 추가
    console.log('프로필 편집 클릭됨');
  };

  return (
    <Layout style={styles.container}>
      {/* 유저 아바타 */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/150' }} // 유저 아바타 이미지 경로
        />
        <Text category="h6">{userName}</Text>
        <Button
          appearance="ghost"
          status="primary"
          size="tiny"
          onPress={handleEditProfile}
          style={styles.editButton}
        >
          편집
        </Button>
      </View>

      {/* 유저 정보 */}
      <View style={styles.infoContainer}>
        <Text category="label" appearance="hint">
          유저 이름
        </Text>
        <Text category="p1">{userName}</Text>

        <Text category="label" appearance="hint" style={styles.infoSpacing}>
          이메일
        </Text>
        <Text category="p1">{email}</Text>
      </View>

      {/* 회원탈퇴 버튼 */}
      <Button
        appearance="ghost"
        status="danger"
        onPress={handleDeleteAccount}
        style={styles.deleteButton}
      >
        계정 삭제
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  editButton: {
    marginTop: 4,
  },
  infoContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  infoSpacing: {
    marginTop: 16,
  },
  twoFactorButton: {
    marginTop: 8,
    width: '100%',
  },
  deleteButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
});

export default SettingsAccountView;
