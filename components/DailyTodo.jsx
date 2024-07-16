import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, ListItem, useTheme } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TodoModal from './TodoModal';

const todosApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://localhost:8000/todos/';

const DailyTodo = ({ item, index }) => {
  const [completed, setCompleted] = useState(item.isCompleted);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCheck = useCallback(() => {
    setCompleted(!completed);
    // API 요청 보내서 todo 상태 변화시키기
  }, [completed]);

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
        title={item.content}
        key={index}
        accessoryLeft={props => checkIcon(props)}
        accessoryRight={props => settingIcon(props)}
        onPress={() => setVisible(true)}
      />
      <TodoModal item={item} visible={visible} setVisible={setVisible} />
    </>
  );
};

export default DailyTodo;
