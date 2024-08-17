import { LoginContext } from '@/contexts/LoginContext';
import { INBOX_QUERY_KEY } from '@/hooks/useInboxTodoQuery';
import { useSubTodoAddMutation } from '@/hooks/useSubTodoMutations';
import {
  useTodoAddMutation,
  useTodoDeleteMutation,
  useTodoUpdateMutation,
} from '@/hooks/useTodoMutations';
import {
  handleLogEvent,
  INBOXTODO_LIST_CLICK_EVENT,
  INBOXTODO_MEATBALLMENU_CLICK_EVENT,
} from '@/utils/logEvent';
import { useQueryClient } from '@tanstack/react-query';
import { Icon, Input, List, ListItem, useTheme } from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import InboxSubTodo from './InboxSubTodo';

import TodoModal from './TodoModal';

const InboxTodo = ({ item, drag, isActive }) => {
  const theme = useTheme();
  const [content, setContent] = useState(item.content);
  const [isEditing, setIsEditing] = useState(false);
  const [subTodoInput, setSubTodoInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken } = useContext(LoginContext);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: addInboxTodo, isSuccess: addInboxTodoIsSuccess } =
    useTodoAddMutation();
  const { mutate: updateInboxTodo, isSuccess: updateInboxTodoIsSuccess } =
    useTodoUpdateMutation();
  const { mutate: deleteInboxTodo, isSuccess: deleteInboxTodoIsSuccess } =
    useTodoDeleteMutation();
  const { mutate: addInboxSubTodo, isSuccess: addInboxSubTodoIsSuccess } =
    useSubTodoAddMutation();
  const { userId } = useContext(LoginContext);

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  useEffect(() => {
    if (addInboxTodoIsSuccess) {
      queryClient.invalidateQueries(INBOX_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInboxTodoIsSuccess]);

  useEffect(() => {
    if (updateInboxTodoIsSuccess) {
      queryClient.invalidateQueries(INBOX_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateInboxTodoIsSuccess]);

  useEffect(() => {
    if (deleteInboxTodoIsSuccess) {
      queryClient.invalidateQueries(INBOX_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteInboxTodoIsSuccess]);

  const handleTodoUpdate = () => {
    const updatedData = {
      todoId: item.id,
      content: content,
    };
    updateInboxTodo(updatedData);
  };

  const tmpOrder = () => {
    const now = new Date();
    const milliseconds = now.getTime();
    const unixTime = Math.floor(milliseconds / 1000);
    return unixTime.toString();
  };

  const handleSubtodoSubmit = () => {
    if (subTodoInput !== '') {
      const subTodoData = {
        todo: item.id,
        content: subTodoInput,
        date: null,
        isCompleted: false,
        order: tmpOrder(),
      };
      addInboxSubTodo({ accessToken: accessToken, todoData: subTodoData });
      setSubTodoInput('');
      setSubTodoInputActivated(false);
    }
  };

  const handleSubTodoCreate = () => {
    setModalVisible(false);
    setSubTodoInputActivated(true);
  };

  const renderSubTodo = ({ item, index }) => {
    return <InboxSubTodo item={item} key={index} />;
  };

  const outlineIcon = props => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon
          {...props}
          name="minus-outline"
          pack="eva"
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
    );
  };

  const settingIcon = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleLogEvent(INBOXTODO_MEATBALLMENU_CLICK_EVENT, {
            time: new Date().toISOString(),
            userId: userId,
            todoId: item.id,
          });
          setModalVisible(true);
        }}
      >
        <Icon
          {...props}
          name="more-horizontal-outline"
          pack="eva"
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
    );
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
        accessoryLeft={props => outlineIcon(props)}
        accessoryRight={props => settingIcon(props)}
        onPress={() => {
          handleLogEvent(INBOXTODO_LIST_CLICK_EVENT, {
            time: new Date().toISOString(),
            userId: userId,
            todoId: item.id,
          });
          setModalVisible(true);
        }}
        onLongPress={drag}
        isActive={isActive}
      />
      <List
        data={item.children}
        renderItem={renderSubTodo}
        contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
        ListFooterComponent={
          subTodoInputActivated ? (
            <Input
              placeholder="Place your Text"
              style={styles.input}
              value={subTodoInput}
              onChangeText={nextInput => {
                setSubTodoInput(nextInput);
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
        onSubTodoCreate={handleSubTodoCreate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
  },
});

export default InboxTodo;
