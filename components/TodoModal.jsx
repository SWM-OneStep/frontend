import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import { convertGmtToKst } from '@/utils/convertTimezone';
import {
  Button,
  Calendar,
  Card,
  Icon,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const editIcon = props => {
  return <Icon {...props} name="edit-outline" fill="blue" />;
};

const deleteIcon = props => {
  return <Icon {...props} name="trash-2-outline" fill="red" />;
};

const listIcon = props => {
  return <Icon {...props} name="list-outline" fill="green" />;
};

const calendarIcon = props => {
  return <Icon {...props} name="calendar-outline" fill="blue" />;
};

const inboxIcon = props => {
  return <Icon {...props} name="inbox-outline" fill="blue" />;
};

const todosApi =
  'http://ec2-43-201-109-163.ap-northeast-2.compute.amazonaws.com:8000/todos/todo/';

const TodoModal = ({
  item = null,
  isTodo = true,
  visible = false,
  setVisible = () => {},
}) => {
  const openEditModal = useModalStore(state => state.openEditModal);
  const setSubTodoInputActivated = useModalStore(
    state => state.setSubTodoInputActivated,
  );
  const setModalVisible = useModalStore(state => state.setModalVisible);
  const setSelectedTodo = useTodoStore(state => state.setSelectedTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const handleDelete = async item_id => {
    deleteTodo(item_id);
    setVisible(false);
  };

  const handleEdit = async () => {
    openEditModal();
  };

  const handleSubtodoCreateInitialize = todo => {
    setModalVisible(false);
    setSubTodoInputActivated(true);
    setSelectedTodo(todo);
  };

  if (!item) {
    return null;
  }

  const handleTodoDateUpdate = async date => {
    const kstDate = convertGmtToKst(date).toISOString().split('T')[0];
    // API 호출
    const updatedTodo = await fetchTodoDateUpdateApi(kstDate);
    console.log('updatedTodo', updatedTodo);
  };

  const fetchTodoDateUpdateApi = async date => {
    const bodyData = {
      id: item.id,
      start_date: date,
      end_date: date,
    };
    const response = await fetch(todosApi, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(bodyData),
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  };

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setVisible(false);
        }}
        style={isTodo ? styles.modalTodo : styles.modalSubTodo}
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
                onPress={() => handleEdit()}
              >
                <Text>수정하기</Text>
              </Button>
              <Button
                accessoryLeft={deleteIcon}
                status="basic"
                style={styles.button}
                onPress={() => handleDelete(item.id)}
              >
                <Text>삭제하기</Text>
              </Button>
            </View>
            {isTodo ? (
              <View>
                <Button
                  accessoryLeft={listIcon}
                  status="basic"
                  style={styles.button}
                  onPress={() => handleSubtodoCreateInitialize(item)}
                >
                  <Text>하위 투두 생성하기</Text>
                </Button>
              </View>
            ) : null}
            <View>
              <Button
                accessoryLeft={calendarIcon}
                status="basic"
                style={styles.button}
                onPress={() => {
                  setVisible(false);
                  setCalendarModalVisible(true);
                }}
              >
                <Text>날짜 바꾸기</Text>
              </Button>
            </View>
            <View>
              <Button
                accessoryLeft={inboxIcon}
                status="basic"
                style={styles.button}
                onPress={() => {}}
              >
                <Text>보관함에 넣기</Text>
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
      <Modal
        visible={calendarModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setCalendarModalVisible(false);
        }}
        style={styles.modalCalendar}
      >
        <Card disabled={true} style={styles.cardCalendar}>
          <Calendar
            date={calendarDate}
            onSelect={nextDate => {
              setCalendarDate(nextDate);
            }}
            style={styles.calendar}
          />
        </Card>
        <Button
          onPress={() => {
            handleTodoDateUpdate(calendarDate);
            setCalendarModalVisible(false);
          }}
        >
          <Text>확인</Text>
        </Button>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalTodo: {
    bottom: 0,
    top: '57%',
    width: '100%',
    justifyContent: 'flex-end', // Align the modal at the bottom
  },
  modalSubTodo: {
    bottom: 0,
    top: '65%',
    width: '100%',
    justifyContent: 'flex-end', // Align the modal at the bottom
  },
  modalCalendar: {
    bottom: 0,
    width: '100%',
    top: '50%',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  cardCalendar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  calendar: {
    width: '100%',
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
