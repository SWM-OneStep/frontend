import { DateContext } from '@/contexts/DateContext';
import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import {
  Icon,
  Input,
  List,
  ListItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DailySubTodo from './DailySubTodo';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const DailyTodo = ({ item }) => {
  const [completed, setCompleted] = useState(item.isCompleted);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);
  const isEditing = useModalStore(state => state.isEditing);
  const setIsEditing = useModalStore(state => state.setIsEditing);
  const selectedTodo = useTodoStore(state => state.selectedTodo);
  const [subTodoInput, setSubtodoInput] = useState('');
  const subTodoInputActivated = useModalStore(
    state => state.subTodoInputActivated,
  );
  const setSubTodoInputActivated = useModalStore(
    state => state.setSubTodoInputActivated,
  );
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const { date } = useContext(DateContext);
  const editTodo = useTodoStore(state => state.editTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const addSubTodo = useTodoStore(state => state.addSubTodo);

  const handleCheck = useCallback(() => {
    setCompleted(!completed);
    toggleTodo({ ...item });
  }, [completed, item, toggleTodo]);

  const renderSubTodo = ({ item, index }) => {
    return <DailySubTodo item={item} key={index} />;
  };

  const settingIcon = props => {
    return (
      <TouchableOpacity onPress={() => openModal(item)}>
        <Icon
          {...props}
          name="more-horizontal-outline"
          pack="eva"
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
    );
  };

  const checkIcon = props => {
    return (
      <TouchableOpacity onPress={handleCheck}>
        <Icon
          {...props}
          name="checkmark-circle-2-outline"
          fill={
            completed ? theme['color-primary-500'] : theme['text-basic-color']
          }
        />
      </TouchableOpacity>
    );
  };

  const handleSubtodoSubmit = () => {
    addSubTodo(subTodoInput, item, date, '0:hzzzzzzz');
    setSubtodoInput('');
    setSubTodoInputActivated(false);
  };

  return (
    <>
      <ListItem
        title={
          isEditing && selectedTodo != null && item.id === selectedTodo.id ? (
            <Input
              value={content}
              onChangeText={value => setContent(value)}
              onSubmitEditing={() => {
                editTodo({
                  ...item,
                  content,
                });
                closeModal();
                setIsEditing(false);
              }}
              autoFocus={true}
            />
          ) : (
            <Text>{item.content}</Text>
          )
        }
        key={item.id}
        accessoryLeft={props => checkIcon(props)}
        accessoryRight={props => settingIcon(props)}
        onPress={() => openModal(item)}
      />
      <List
        data={item && item.subtodos ? item.subtodos : []}
        renderItem={renderSubTodo}
        contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
        ListFooterComponent={
          subTodoInputActivated &&
          selectedTodo &&
          item.id === selectedTodo.id ? (
            <Input
              placeholder="Place your Text"
              style={styles.input}
              value={subTodoInput}
              onChangeText={nextInput => {
                setSubtodoInput(nextInput);
              }}
              // autoFocus={true}
              onSubmitEditing={handleSubtodoSubmit}
            />
          ) : null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
  },
});

export default DailyTodo;
