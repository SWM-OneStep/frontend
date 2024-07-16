import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, ListItem, useTheme } from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TodoModal from './TodoModal';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const todosApi = 'http://localhost:8000/todos/';

const DailyTodo = ({ item, index }) => {
  const [completed, setCompleted] = useState(item.isCompleted);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const reverseCheck = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await fetch(`${todosApi}?user_id=${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.error) {
      return;
    } else {
      await response.json();
    }
  };

  const checkIcon = props => {
    return (
      <TouchableOpacity onPress={() => handleCheck()}>
        {completed ? (
          <Icon
            {...props}
            name="checkmark-circle-2-outline"
            fill={theme['color-primary-500']}
          />
        ) : (
          <Icon
            {...props}
            name="checkmark-circle-2-outline"
            theme={theme['text-basic-color']}
          />
        )}
      </TouchableOpacity>
    );
  };

  const settingIcon = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
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

  const handleCheck = () => {
    setCompleted(!completed);
    // API 요청 보내서 todo 상태 변화시키기
  };

  return (
    <>
      <ListItem
        title={item.content}
        key={index}
        accessoryLeft={props => checkIcon(props)}
        accessoryRight={props => settingIcon(props)}
      />
      <TodoModal
        item={item}
        index={index}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};
const styles = StyleSheet.create({
  icon_checked: {
    color: 'green',
  },
  icon_unchecked: {
    color: 'gray',
  },
});

export default DailyTodo;
