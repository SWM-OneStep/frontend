import { Card, Modal, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

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
        <Text>{item.content}</Text>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    bottom: 0,
    top: '50%',
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
});

export default TodoModal;
