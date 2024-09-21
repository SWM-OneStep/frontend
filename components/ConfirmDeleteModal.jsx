import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { useCategoryDeleteMutation } from '@/hooks/useCategoryMutation';
import { useRouter } from 'expo-router';

const ConfirmDeleteModal = ({ modalVisible, setModalVisible, categoryId }) => {
  const router = useRouter();

  const { mutate: deleteCategory, isSuccess: isDeleteSuccess } =
    useCategoryDeleteMutation();

  const handleAddToDo = () => {
    deleteCategory(categoryId);
  };

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
          <Text style={styles.title}> 카테고리 삭제하기 </Text>
          <Text style={styles.message}>카테고리를 정말 삭제할까요?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              handleAddToDo();
            }}
          >
            예
          </Button>
          <Button
            style={styles.button}
            status="basic"
            onPress={() => setModalVisible(false)}
          >
            아니오
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
