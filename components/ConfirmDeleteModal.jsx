import { useCategoryDeleteMutation } from '@/hooks/api/useCategoryMutation';
import '@/locales/index';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const ConfirmDeleteModal = ({ modalVisible, setModalVisible, categoryId }) => {
  const router = useRouter();

  const { mutate: deleteCategory, isSuccess: isDeleteSuccess } =
    useCategoryDeleteMutation();

  const handleAddToDo = () => {
    deleteCategory(categoryId);
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isDeleteSuccess) {
      setModalVisible(false);
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Card disabled={true} style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {t('components.confirmDeleteModal.deleteCategory')}
          </Text>
          <Text style={styles.message}>
            {t('components.confirmDeleteModal.confirmDeleteCategory')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              handleAddToDo();
            }}
          >
            {t('components.confirmDeleteModal.yes')}
          </Button>
          <Button
            style={styles.button}
            status="basic"
            onPress={() => setModalVisible(false)}
          >
            {t('components.confirmDeleteModal.no')}
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 20,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
});

export default ConfirmDeleteModal;
