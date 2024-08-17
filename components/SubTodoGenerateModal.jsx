import Api from '@/utils/api';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const api = Api.getInstance();

const SubTodoGenerateModal = ({
  modalVisible,
  setModalVisible,
  setGeneratedSubToDos,
  todoId,
}) => {
  const handleAddToDo = () => {
    // LLM API 호출 로직 추가
    api.recommendSubTodo(todoId, response => {
      setGeneratedSubToDos(response.data.children);
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Card disabled={true} style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>하위 투두 생성</Text>
          <Text style={styles.message}>하위 투두를 생성할까요?</Text>
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
    marginHorizontal: 10,
  },
});

export default SubTodoGenerateModal;
