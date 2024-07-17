import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Icon, Modal, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const editIcon = props => {
  return <Icon {...props} name="edit-outline" fill="blue" />;
};

const deleteIcon = props => {
  return <Icon {...props} name="trash-2-outline" fill="red" />;
};

const todoApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const TodoModal = ({ item, visible, setVisible }) => {
  const handleEdit = async ({ item_id }) => {
    // const token = AsyncStorage.getItem('accessToken');
    const response = await fetch(`${todoApi}$?user_id=1&item_id=${item_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  };

  const handleDelete = async item_id => {
    // const token = AsyncStorage.getItem('accessToken');
    const response = await fetch(`${todoApi}$?user_id=1&item_id=${item_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
    });
    setVisible(false);
    return await response.json();
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => {
        setVisible(false);
      }}
      style={styles.modal}
    >
      <Card disabled={true} style={styles.card}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text category="h6">{item.content}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              accessoryLeft={editIcon}
              status="basic"
              style={styles.button}
              onPress={item => {
                handleEdit(item.id);
              }}
            >
              <Text>수정하기</Text>
            </Button>
            <Button
              accessoryLeft={deleteIcon}
              status="basic"
              style={styles.button}
              onPress={item => handleDelete(item.id)}
            >
              <Text>삭제하기</Text>
            </Button>
          </View>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    bottom: 0,
    top: '75%',
    width: '100%',
    justifyContent: 'flex-end', // Align the modal at the bottom
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    margin: 5,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default TodoModal;
