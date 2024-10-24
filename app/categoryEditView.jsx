import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { LoginContext } from '@/contexts/LoginContext';
import { useCategoryUpdateMutation } from '@/hooks/api/useCategoryMutation';
import '@/locales/index';
import * as eva from '@eva-design/eva';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  ApplicationProvider,
  Button,
  Divider,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
  const { t, i18n } = useTranslation();

  const { mutate: updateCategory, isSuccess: isUpdateSuccess } =
    useCategoryUpdateMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      setCategoryName('');
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateSuccess]);

  const openBottomSheet = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleUpdateCategory = () => {
    const updatedData = {
      title: categoryName,
      color: selectedColor,
      category_id: params.id,
    };
    updateCategory({ updatedData });
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
              {t('views.categoryEditView.category')}
            </Text>
            {isEditing ? (
              <TextInput
                placeholder={t('views.categoryEditView.inputCategory')}
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
                {t('views.categoryEditView.color')}
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
                onPress={() => handleUpdateCategory()}
              >
                {t('views.categoryEditView.edit')}
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
                {t('views.categoryEditView.delete')}
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
                    {t('views.categoryEditView.color')}
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
                    {t('views.categoryEditView.close')}
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
