import { LoginContext } from '@/contexts/LoginContext';
import { useCategoryAddMutation } from '@/hooks/api/useCategoryMutation';
import '@/locales/index';
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
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';

const colors = ['#FF3D71', '#FF7E29', '#FFC233', '#4CAF50', '#00BCD4'];

const CategoryAddView = () => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const bottomSheetRef = useRef(null);

  const { userId } = useContext(LoginContext);
  const { t, i18n } = useTranslation();

  const { mutate: addCategory, isSuccess } = useCategoryAddMutation();

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
    addCategory({ addCategoryData });
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
            label={t('views.categoryAddView.label')}
            placeholder={t('views.categoryAddView.placeholder')}
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
              {t('views.categoryAddView.color')}
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
                  {t('views.categoryAddView.color')}
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
                  {t('views.categoryAddView.close')}
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
