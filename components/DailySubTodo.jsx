import TodoModal from '@/components/TodoModal';
import { LoginContext } from '@/contexts/LoginContext';
import {
  SUBTODO_QUERY_KEY,
  useSubTodoUpdateMutation,
} from '@/hooks/useSubTodoMutations';
import Api from '@/utils/api';
import {
  DAILYTODO_SUBTODOCOMPLETE_CLICK_EVENT,
  handleLogEvent,
} from '@/utils/logEvent';
import { Icon, Input, ListItem, Text, useTheme } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';

const DailySubTodo = ({ item }) => {
  const [completed, setCompleted] = useState(item.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const { accessToken } = useContext(LoginContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: updateSubTodo } = useSubTodoUpdateMutation();
  const { userId } = useContext(LoginContext);
  const { useMetadata } = Api();

  const handleCheck = () => {
    setCompleted(!completed);
    const updatedData = {
      subtodoId: item.id,
      isCompleted: !item.isCompleted,
    };
    updateSubTodo(updatedData, useMetadata);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  const handleSubTodoUpdate = () => {
    const updatedData = {
      subtodoId: item.id,
      content: content,
    };
    updateSubTodo(updatedData, useMetadata);
  };

  const checkIcon = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleLogEvent(DAILYTODO_SUBTODOCOMPLETE_CLICK_EVENT, {
            time: new Date().toISOString(),
            userId: userId,
            subtodoId: item.id,
          });
          handleCheck();
        }}
      >
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

  return (
    <>
      <ListItem
        title={
          isEditing ? (
            <Input
              value={content}
              onChangeText={value => setContent(value)}
              onSubmitEditing={() => {
                handleSubTodoUpdate();
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
        style={{ paddingLeft: 40 }}
      />
      <TodoModal
        item={item}
        isTodo={false}
        visible={modalVisible}
        setVisible={setModalVisible}
        onEdit={handleEdit}
      />
    </>
  );
};

export default DailySubTodo;
