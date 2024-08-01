import { LoginContext } from '@/contexts/LoginContext';
import * as eva from '@eva-design/eva';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  ApplicationProvider,
  Button,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import useCategoryAddMutation from '../hooks/useCategoryAddMutation';

const colors = ['#FF3D71', '#FF7E29', '#FFC233', '#4CAF50', '#00BCD4'];

const CategoryAddView = () => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const bottomSheetRef = useRef(null);
  const { userId, accessToken } = useContext(LoginContext);

  const {
    mutate: addCategory,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useCategoryAddMutation({
    onSuccess: () => {
      setCategoryName('');
      router.back();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setCategoryName('');
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const openBottomSheet = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const tmpOrder = () => {
    const now = new Date();
    const milliseconds = now.getTime();
    const unixTime = Math.floor(milliseconds / 1000);
    return unixTime.toString();
  };

  const handleAddCategory = () => {
    const addCategoryData = {
      title: categoryName,
      user_id: parseInt(userId, 10),
      color: selectedColor,
      order: tmpOrder(),
    };
    addCategory({ accessToken, addCategoryData });
  };

  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: item,
        margin: 5,
      }}
      onPress={() => {
        setSelectedColor(item);
        bottomSheetRef.current.close(); // Close the bottom sheet
      }}
    />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, padding: 16 }}>
          <Input
            label="카테고리 입력"
            placeholder="카테고리 입력"
            value={categoryName}
            onChangeText={setCategoryName}
            style={{ marginBottom: 16 }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
            onPress={() => openBottomSheet()}
          >
            <Text category="label" style={{ flex: 1 }}>
              색상
            </Text>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: selectedColor,
                marginLeft: 10,
                borderWidth: 1,
                borderColor: '#000',
              }}
            />
          </TouchableOpacity>
          <Button onPress={() => handleAddCategory()}>완료</Button>
          <BottomSheet
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            snapPoints={['50%']}
            index={-1}
          >
            <BottomSheetView
              style={{ flex: 1, padding: 24, backgroundColor: 'white' }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                }}
              >
                <Text category="h6" style={{ marginBottom: 16 }}>
                  색상
                </Text>
                <FlatList
                  data={colors}
                  renderItem={renderColorItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={5}
                />
                <Button
                  onPress={() => bottomSheetRef.current.close()}
                  style={{ marginTop: 16 }}
                >
                  닫기
                </Button>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </Layout>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default CategoryAddView;
