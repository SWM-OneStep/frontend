import { LoginContext } from '@/contexts/LoginContext';
import { useSubTodoAddMutation } from '@/hooks/api/useSubTodoMutations';
import {
  useTodoAddMutation,
  useTodoUpdateMutation,
} from '@/hooks/api/useTodoMutations';
import '@/locales/index';
import {
  handleLogEvent,
  INBOXTODO_LIST_CLICK_EVENT,
  INBOXTODO_MEATBALLMENU_CLICK_EVENT,
} from '@/utils/logEvent';
import { Icon, Input, List, ListItem, useTheme } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import InboxSubTodo from './InboxSubTodo';
import TodoModal from './TodoModal';

const InboxTodo = ({ item, drag, isActive }) => {
  const theme = useTheme();
  const [content, setContent] = useState(item.content);
  const [isEditing, setIsEditing] = useState(false);
  const [subTodoInput, setSubTodoInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  useTodoAddMutation();
  const { mutate: updateInboxTodo } = useTodoUpdateMutation();
  const { mutate: addInboxSubTodo } = useSubTodoAddMutation();
  const { userId } = useContext(LoginContext);
  const { t, i18n } = useTranslation();

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  const handleTodoUpdate = () => {
    const updatedData = {
      todoId: item.id,
      content: content,
    };
    updateInboxTodo({ updatedData: updatedData });
  };

  const handleSubtodoSubmit = () => {
    if (subTodoInput !== '') {
      const subTodoData = {
        todoId: item.id,
        content: subTodoInput,
      };
      addInboxSubTodo({ todoData: subTodoData });
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
              placeholder={t('components.dailyTodos.writeTodo')}
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
