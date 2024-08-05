import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
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
  Button,
} from '@ui-kitten/components';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DailySubTodo from './DailySubTodo';
import TodoModal from './TodoModal';
import { Card, Layout, Modal } from 'react-native-ui-kitten';
import SubTodoGenerateModal from './SubTodoGenerateModal';

const DailyTodo = ({ item, drag, isActive }) => {
  const [content, setContent] = useState(item.content);
  const theme = useTheme();
  const { selectedDate } = useContext(DateContext);
  const [completed, setCompleted] = useState(item.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [subTodoInput, setSubtodoInput] = useState('');
  const { accessToken } = useContext(LoginContext);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  const [generatedSubTodos, setGeneratedSubTodos] = useState([]);
  const queryClient = useQueryClient();
  const { mutate: addSubTodo, isSuccess: addSubTodoIsSuccess } =
    useSubTodoAddMutation();
  const { mutate: updateTodo, isSuccess: updateTodoIsSuccess } =
    useTodoUpdateMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [
    subTodoGenerateAlertModalVisible,
    setSubTodoGenerateAlertModalVisible,
  ] = useState(false);

  const [selectedSubTodos, setSelectedSubTodos] = useState({});
  const handleSelectSubTodo = index => {
    setSelectedSubTodos(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  const handleSubTodoCreate = () => {
    setModalVisible(false);
    setSubTodoInputActivated(true);
  };

  const handleApplySelection = () => {};

  const renderSubTodo = ({ item, index }) => {
    return <DailySubTodo item={item} key={index} />;
  };

  const renderGeneratedTodo = ({ item, index }) => {
    return (
      <ListItem
        title={item.content}
        key={() => index.toString()}
        style={{ paddingLeft: 40 }}
        accessoryRight={props =>
          generatedSubtodoAcceptIcon(props, index, item.isChecked)
        }
      />
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

  const settingIcon = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        {!item.children.length && !generatedSubTodos.length && (
          <TouchableOpacity
            onPress={() => setSubTodoGenerateAlertModalVisible(true)}
          >
            <Icon
              {...props}
              name="flash-outline"
              pack="eva"
              fill={theme['text-basic-color']}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon
            {...props}
            name="more-horizontal-outline"
            pack="eva"
            fill={theme['text-basic-color']}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const generatedSubtodoAcceptIcon = (props, index, isChecked) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setGeneratedSubTodos(prev => {
              return prev.map((todo, i) => {
                if (i === index) {
                  return { ...todo, isChecked: false };
                }
                return todo;
              });
            });
          }}
        >
          <Icon
            {...props}
            fill={
              !isChecked
                ? theme['color-primary-500']
                : theme['text-basic-color']
            }
            name="close-outline"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGeneratedSubTodos(prev => {
              return prev.map((todo, i) => {
                if (i === index) {
                  return { ...todo, isChecked: true };
                }
                return todo;
              });
            });
          }}
        >
          <Icon
            {...props}
            fill={
              isChecked ? theme['color-primary-500'] : theme['text-basic-color']
            }
            name="done-all-outline"
          />
        </TouchableOpacity>
      </View>
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
        accesso
        onPress={() => setModalVisible(true)}
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
                setSubtodoInput(nextInput);
              }}
              autoFocus={true}
              onSubmitEditing={handleSubtodoSubmit}
            />
          ) : null
        }
      />
      {generatedSubTodos.length > 0 && (
        <>
          <List
            data={generatedSubTodos}
            renderItem={renderGeneratedTodo}
            contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
          />
          <Button onPress={handleApplySelection}>반영하기</Button>
        </>
      )}
      <TodoModal
        item={item}
        isTodo={true}
        visible={modalVisible}
        setVisible={setModalVisible}
        onEdit={handleEdit}
        onSubTodoCreate={handleSubTodoCreate}
      />
      <SubTodoGenerateModal
        modalVisible={subTodoGenerateAlertModalVisible}
        setModalVisible={setSubTodoGenerateAlertModalVisible}
        setGeneratedSubToDos={setGeneratedSubTodos}
        todoContent={item.content}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DailyTodo;
