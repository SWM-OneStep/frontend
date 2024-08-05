import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import axios from 'axios';

const SubTodoGenerateModal = ({
  modalVisible,
  setModalVisible,
  todoContent,
  setGeneratedSubToDos,
}) => {
  const handleAddToDo = () => {
    // LLM API 호출 로직 추가
    axios
      .post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that generates sub-tasks for a given task.',
            },
            {
              role: 'user',
              content: `Create sub-tasks for the task: "${todoContent}". 
            List each sub-task on a new line. 
            Example output:
            Sub-task 1
            Sub-task 2
            Sub-task 3

            instructions:
            any explanation not needed
            speack in Korean
            please separate sub tasks only with new lines
            `,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer MY-API-KEY`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setGeneratedSubToDos(
          response.data.choices[0].message.content.split('\n').map(subToDo => ({
            content: subToDo,
            isChecked: true,
          })),
        );
        setModalVisible(false);
      })
      .catch(error => {
        console.error(error.response);
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
