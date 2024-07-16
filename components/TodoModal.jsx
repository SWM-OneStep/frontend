import { Card, Text, Button, Modal } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const TodoModal = ({ item, index, visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      style={styles.modal}
    >
      <Card disabled={true} style={styles.card}>
        <Text>{item.content}</Text>
        <Text>{index}</Text>
        <Button onPress={() => setVisible(false)}>DISMISS</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TodoModal;
