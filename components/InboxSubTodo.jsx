import { LoginContext } from '@/contexts/LoginContext';
import { useSubTodoUpdateMutation } from '@/hooks/useSubTodoMutations';
import { Icon, Input, ListItem } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-elements';
import TodoModal from './TodoModal';

const InboxSubTodo = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const { accessToken } = useContext(LoginContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: updateInboxSubTodo } = useSubTodoUpdateMutation();

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  const handleInboxSubTodoUpdate = () => {
    const updatedData = {
      subtodoId: item.id,
      content: content,
    };
    updateInboxSubTodo({ accessToken: accessToken, updatedData: updatedData });
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
                handleInboxSubTodoUpdate();
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

export default InboxSubTodo;
