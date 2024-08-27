import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useModalStore from '@/contexts/ModalStore';
import {
  useSubTodoDeleteMutation,
  useSubTodoUpdateMutation,
} from '@/hooks/useSubTodoMutations';
import {
  useTodoDeleteMutation,
  useTodoUpdateMutation,
} from '@/hooks/useTodoMutations';
import Api from '@/utils/Api';
import { convertGmtToKst } from '@/utils/convertTimezone';
import {
  handleLogEvent,
  TODOMODAL_CHANGEDATE_CLICK_EVENT,
  TODOMODAL_CREATESUBTODO_CLICK_EVENT,
  TODOMODAL_DELETE_CLICK_EVENT,
  TODOMODAL_EDIT_CLICK_EVENT,
  TODOMODAL_MOVETOINBOX_CLICK_EVENT,
} from '@/utils/logEvent';
import {
  Button,
  Calendar,
  Card,
  Icon,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useContext, useState } from 'react';
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

const TodoModal = ({
  item = null,
  isTodo = true,
  visible = false,
  setVisible = () => {},
  onEdit = () => {},
  onSubTodoCreate = () => {},
}) => {
  // const setSubTodoInputActivated = useModalStore(
  //   state => state.setSubTodoInputActivated,
  // );
  const setModalVisible = useModalStore(state => state.setModalVisible);
  // const setSelectedTodo = useTodoStore(state => state.setSelectedTodo);
  const { selectedDate } = useContext(DateContext);

  const [calendarDate, setCalendarDate] = useState(selectedDate.toDate());
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const { accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { userId } = useContext(LoginContext);

  const { mutate: updateTodoDate } = useTodoUpdateMutation();
  const { mutate: updateSubTodoDate } = useSubTodoUpdateMutation();
  const { mutate: deleteTodo } = useTodoDeleteMutation();
  const { mutate: deleteSubTodo } = useSubTodoDeleteMutation();
  const { useMetadata } = Api();

  const handleDelete = async item_id => {
    if (isTodo) {
      deleteTodo(item_id, useMetadata);
    } else {
      deleteSubTodo(item_id, useMetadata);
    }
    setVisible(false);
  };

  // const handleSubtodoCreateInitialize = todo => {
  //   // setModalVisible(false);
  //   setVisible(false);
  //   setSubTodoInputActivated(true);
  //   // setSelectedTodo(todo);
  // };

  if (!item) {
    return null;
  }

  const handleDateUpdate = date => {
    const kstDate = convertGmtToKst(date).toISOString().split('T')[0];
    if (isTodo) {
      const updatedTodo = {
        start_date: kstDate,
        end_date: kstDate,
        todo_id: item.id,
        category_id: selectedCategory,
      };
      updateTodoDate(updatedTodo, useMetadata);
    } else {
      const updatedSubTodo = {
        date: kstDate,
        subtodoId: item.id,
      };
      updateSubTodoDate({
        accessToken: accessToken,
        updatedData: updatedSubTodo,
      });
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setModalVisible(false);
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
                onPress={() => {
                  handleLogEvent(TODOMODAL_EDIT_CLICK_EVENT, {
                    time: new Date().toISOString(),
                    userId: userId,
                    todoId: item.id,
                  });
                  onEdit();
                }}
              >
                <Text>수정하기</Text>
              </Button>
              <Button
                accessoryLeft={deleteIcon}
                status="basic"
                style={styles.button}
                onPress={() => {
                  handleLogEvent(TODOMODAL_DELETE_CLICK_EVENT, {
                    time: new Date().toISOString(),
                    userId: userId,
                    todoId: item.id,
                  });
                  handleDelete(item.id);
                }}
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
                  onPress={() => {
                    handleLogEvent(TODOMODAL_CREATESUBTODO_CLICK_EVENT, {
                      time: new Date().toISOString(),
                      userId: userId,
                      todoId: item.id,
                    });
                    onSubTodoCreate();
                  }}
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
                  handleLogEvent(TODOMODAL_CHANGEDATE_CLICK_EVENT, {
                    time: new Date().toISOString(),
                    userId: userId,
                    todoId: item.id,
                  });
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
                onPress={() => {
                  handleLogEvent(TODOMODAL_MOVETOINBOX_CLICK_EVENT, {
                    time: new Date().toISOString(),
                    userId: userId,
                    todoId: item.id,
                  });
                }}
              >
                <Text>인박스에 넣기</Text>
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
            handleDateUpdate(calendarDate);
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
