import useModalStore from '@/contexts/ModalStore';
import useTodoStore from '@/contexts/TodoStore';
import { Icon, Input, ListItem, Text, useTheme } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

const DailySubTodo = ({ item }) => {
  const [completed, setCompleted] = useState(item.isCompleted);
  const openModal = useModalStore(state => state.openModal);
  const selectedTodo = useTodoStore(state => state.selectedTodo);
  const isEditing = useModalStore(state => state.isEditing);
  const setIsEditing = useModalStore(state => state.setIsEditing);
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const editTodo = useTodoStore(state => state.editTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);

  const handleCheck = useCallback(() => {
    setCompleted(!completed);
    // API 요청 보내서 todo 상태 변화시키기
    toggleTodo({ ...item });
  }, [completed, item, toggleTodo]);

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
        style={{ paddingLeft: 40 }}
      />
    </>
  );
};

export default DailySubTodo;
