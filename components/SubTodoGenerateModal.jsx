import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import axios from 'axios';
import { API_PATH } from '@/utils/config';
import * as Sentry from '@sentry/react-native';
import { LoginContext } from '@/contexts/LoginContext';

const SubTodoGenerateModal = ({
  modalVisible,
  setModalVisible,
  setGeneratedSubToDos,
  todoId,
}) => {
  const { accessToken } = useContext(LoginContext);
  const handleAddToDo = () => {
    // LLM API 호출 로직 추가
    axios
      .get(`${API_PATH.recommend}?todo_id=${todoId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setGeneratedSubToDos(response.data.children);
        setModalVisible(false);
      })
      .catch(error => {
        Sentry.captureException(error);
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
