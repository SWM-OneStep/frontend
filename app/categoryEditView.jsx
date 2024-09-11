import { LoginContext } from '@/contexts/LoginContext';
import * as eva from '@eva-design/eva';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
  Divider,
  useTheme,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  useCategoryAddMutation,
  useCategoryUpdateMutation,
  useCategoryDeleteMutation,
} from '@/hooks/useCategoryMutation';
import { useLocalSearchParams } from 'expo-router';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const colors = ['#FF3D71', '#FF7E29', '#FFC233', '#4CAF50', '#00BCD4'];

const CategoryEditView = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [categoryName, setCategoryName] = useState(params.title || '');
  const [selectedColor, setSelectedColor] = useState(params.color || colors[0]);
  const [isEditing, setIsEditing] = useState(false);
  const bottomSheetRef = useRef(null);
  const { userId, accessToken } = useContext(LoginContext);
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme();

  const { mutate: addCategory, isSuccess } = useCategoryAddMutation();
  const { mutate: updateCategory, isSuccess: isUpdateSuccess } =
    useCategoryUpdateMutation();
  const { mutate: deleteCategory, isSuccess: isDeleteSuccess } =
    useCategoryDeleteMutation();

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
    <ApplicationProvider
      {...eva}
      theme={eva.light}
      onPress={() => {
        setIsEditing(prev => !prev);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsEditing(false);
        }}
      >
        <SafeAreaView
          style={styles.container}
          onPress={() => {
            Keyboard.dismiss();
            setIsEditing(prev => !prev);
          }}
        >
          <Layout style={styles.layout}>
            <Text category="label" style={styles.headerText}>
              카테고리
            </Text>
            {isEditing ? (
              <TextInput
                placeholder="카테고리를 입력해주세요"
                value={categoryName}
                onChangeText={setCategoryName}
                style={styles.input}
                autoFocus={true}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(prev => !prev)}>
                <Text style={styles.categoryName}>{categoryName}</Text>
              </TouchableOpacity>
            )}
            <Divider style={styles.divider} />
            <TouchableOpacity
              style={styles.colorSelector}
              onPress={() => openBottomSheet()}
            >
              <Text
                category="label"
                style={{ fontSize: 20, paddingBottom: 8, flex: 1 }}
              >
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <Button
                style={{ flex: 1, margin: 4 }}
                onPress={() => handleAddCategory()}
              >
                수정하기
              </Button>
              <Button
                style={{
                  flex: 1,
                  margin: 4,
                  borderColor: theme['color-danger-default'],
                  backgroundColor: theme['color-danger-default'],
                }}
                onPress={() => setModalVisible(true)}
              >
                삭제하기
              </Button>
            </View>
            <BottomSheet
              enablePanDownToClose={true}
              closeOnPress={true}
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
            <ConfirmDeleteModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              categoryId={params.id}
            />
          </Layout>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  layout: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    marginLeft: 10,
    padding: 8,
    marginTop: 3,
    margin: 3.2,
  },
  divider: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#8F9BB3',
  },
  input: { fontSize: 16, marginLeft: 10, padding: 8 },
  colorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  button: {
    marginTop: 20,
  },
});

export default CategoryEditView;
