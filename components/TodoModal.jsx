import { Button, Card, Icon, Modal, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const editIcon = props => {
  return <Icon {...props} name="edit-outline" fill="blue" />;
};

const deleteIcon = props => {
  return <Icon {...props} name="trash-2-outline" fill="red" />;
};

const TodoModal = ({ item, visible, setVisible }) => {
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
            >
              <Text>수정하기</Text>
            </Button>
            <Button
              accessoryLeft={deleteIcon}
              status="basic"
              style={styles.button}
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