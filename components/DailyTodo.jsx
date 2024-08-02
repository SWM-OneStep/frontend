import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useModalStore from '@/contexts/ModalStore';
import { QUERY_KEY } from '@/hooks/useCategoriesQuery';
import {
  SUBTODO_QUERY_KEY,
  useSubTodoAddMutation,
} from '@/hooks/useSubTodoMutations';
import { useTodoUpdateMutation } from '@/hooks/useTodoMutations';
import { useQueryClient } from '@tanstack/react-query';
import {
  Icon,
  Input,
  List,
  ListItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DailySubTodo from './DailySubTodo';
import TodoModal from './TodoModal';

const DailyTodo = ({ item, drag, isActive }) => {
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const { selectedDate } = useContext(DateContext);
  const [completed, setCompleted] = useState(item.isCompleted);
  const closeModal = useModalStore(state => state.closeModal);
  const [isEditing, setIsEditing] = useState(false);
  const [subTodoInput, setSubtodoInput] = useState('');
  const { accessToken } = useContext(LoginContext);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: addSubTodo, isSuccess: addSubTodoIsSuccess } =
    useSubTodoAddMutation();
  const { mutate: updateTodo, isSuccess: updateTodoIsSuccess } =
    useTodoUpdateMutation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (addSubTodoIsSuccess) {
      queryClient.invalidateQueries(SUBTODO_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSubTodoIsSuccess]);

  useEffect(() => {
    if (updateTodoIsSuccess) {
      queryClient.invalidateQueries(QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTodoIsSuccess]);

  const handleCheck = () => {
    setCompleted(!completed);
    const updatedData = {
      todoId: item.id,
      isCompleted: !item.isCompleted,
    };
    updateTodo({ accessToken: accessToken, updatedData: updatedData });
  };

  const handleTodoUpdate = () => {
    const updatedData = {
      todoId: item.id,
      content: content,
    };
    updateTodo({ accessToken: accessToken, updatedData: updatedData });
  };

  const renderSubTodo = ({ item, index }) => {
    return <DailySubTodo item={item} key={index} />;
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

  const settingIcon = props => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon
          {...props}
          name="more-horizontal-outline"
          pack="eva"
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
    );
  };

  const tmpOrder = () => {
    const now = new Date();
    const milliseconds = now.getTime();
    const unixTime = Math.floor(milliseconds / 1000);
    return unixTime.toString();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  const handleSubtodoSubmit = () => {
    if (subTodoInput !== '') {
      const modifiedDate = selectedDate.format('YYYY-MM-DD');
      const subTodoData = {
        todo: item.id,
        content: subTodoInput,
        date: modifiedDate,
        isCompleted: false,
        order: tmpOrder(),
      };
      addSubTodo({ accessToken: accessToken, todoData: subTodoData });
      setSubtodoInput('');
      setSubTodoInputActivated(false);
    }
  };

  return (
    <>
      <ListItem
        title={
          isEditing ? (
            <Input
              value={content}
              onChangeText={value => setContent(value)}
              onSubmitEditing={() => {
                handleTodoUpdate();
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
        onPress={() => setModalVisible(true)}
        onLongPress={drag}
        isActive={isActive}
      />
      <List
        data={item.subtodos}
        renderItem={renderSubTodo}
        contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
        ListFooterComponent={
          subTodoInputActivated ? (
            <Input
              placeholder="Place your Text"
              style={styles.input}
              value={subTodoInput}
              onChangeText={nextInput => {
                setSubtodoInput(nextInput);
              }}
              autoFocus={true}
              onSubmitEditing={handleSubtodoSubmit}
            />
          ) : null
        }
      />
      <TodoModal
        item={item}
        isTodo={true}
        visible={modalVisible}
        setVisible={setModalVisible}
        onEdit={handleEdit}
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
