import { LoginContext } from '@/contexts/LoginContext';
import '@/locales/index';
import { API_PATH } from '@/utils/config';
import * as Sentry from '@sentry/react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import axios from 'axios';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const SubTodoGenerateModal = ({
  modalVisible,
  setModalVisible,
  setGeneratedSubToDos,
  todoId,
}) => {
  const { accessToken } = useContext(LoginContext);
  const { t, i18n } = useTranslation();
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
          <Text style={styles.title}>
            {t('components.subTodoGenerateModal.createSubTodo')}
          </Text>
          <Text style={styles.message}>
            {t('components.subTodoGenerateModal.askCreateSubTodo')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              handleAddToDo();
            }}
          >
            {t('components.subTodoGenerateModal.yes')}
          </Button>
          <Button
            style={styles.button}
            status="basic"
            onPress={() => setModalVisible(false)}
          >
            {t('components.subTodoGenerateModal.no')}
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
