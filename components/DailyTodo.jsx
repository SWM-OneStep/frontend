import { Icon, ListItem, useTheme, Input, Text } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import TodoModal from './TodoModal';
import useTodoStore from '@/contexts/TodoStore';

const todosApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://localhost:8000/todos/';

const DailyTodo = ({ item, index }) => {
  const [completed, setCompleted] = useState(item.is_completed);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const editTodo = useTodoStore(state => state.editTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

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
      <TouchableOpacity onPress={openModal}>
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
        key={index}
        accessoryLeft={props => checkIcon(props)}
        accessoryRight={props => settingIcon(props)}
        onPress={() => setVisible(true)}
      />
      <TodoModal
        item={item}
        visible={visible}
        isEditing={isEditing}
        setVisible={setVisible}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default DailyTodo;
