import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import { useSubTodoAddMutation } from '@/hooks/api/useSubTodoMutations';
import { useTodoUpdateMutation } from '@/hooks/api/useTodoMutations';
import {
  DAILYTODO_LIST_CLICK_EVENT,
  DAILYTODO_MEATBALLMENU_CLICK_EVENT,
  DAILYTODO_TODOCOMPLETE_CLICK_EVENT,
  handleLogEvent,
} from '@/utils/logEvent';
import {
  Button,
  Icon,
  Input,
  List,
  ListItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DailySubTodo from './DailySubTodo';

import '@/locales/index';
import SubTodoGenerateModal from './SubTodoGenerateModal';
import TodoModal from './TodoModal';

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
  const [subTodoCandidatesIndexes, setSubTodoCandidatesIndexes] = useState([]);

  const { mutate: addSubTodo } = useSubTodoAddMutation();
  const { mutate: updateTodo } = useTodoUpdateMutation();
  const { userId } = useContext(LoginContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [
    subTodoGenerateAlertModalVisible,
    setSubTodoGenerateAlertModalVisible,
  ] = useState(false);
  const { t, i18n } = useTranslation();

  const handleCheck = () => {
    setCompleted(!completed);
    const updatedData = {
      todoId: item.id,
      isCompleted: !item.isCompleted,
    };
    updateTodo({ accessToken: accessToken, updatedData: updatedData });
  };

  const tmpOrder = (seed = 0) => {
    const now = new Date();
    const milliseconds = now.getTime();
    const unixTime = Math.floor(milliseconds + (seed * 1000) / 1000);
    return unixTime.toString();
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

  const handleApplySelection = () => {
    const newSubTodos = subTodoCandidatesIndexes.map(index => ({
      content: generatedSubTodos[index].content,
      date: generatedSubTodos[index].date,
      todo: generatedSubTodos[index].todo,
      order: tmpOrder(index),
    }));
    addSubTodo({ accessToken: accessToken, todoData: newSubTodos });
    setGeneratedSubTodos([]);
    setSubTodoCandidatesIndexes([]);
  };

  const renderSubTodo = ({ item, index }) => {
    return <DailySubTodo item={item} key={index} />;
  };

  const renderGeneratedTodo = ({ item, index }) => {
    return (
      <ListItem
        title={item.content}
        key={() => index.toString()}
        style={{ paddingLeft: 40 }}
        accessoryRight={props => generatedSubtodoAcceptIcon(props, index)}
      />
    );
  };

  const checkIcon = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleLogEvent(DAILYTODO_TODOCOMPLETE_CLICK_EVENT, {
            time: new Date().toISOString(),
            userId: userId,
            todoId: item.id,
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
        <TouchableOpacity
          onPress={() => {
            handleLogEvent(DAILYTODO_MEATBALLMENU_CLICK_EVENT, {
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
      </View>
    );
  };
  const generatedSubtodoAcceptIcon = (props, index) => {
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
            if (subTodoCandidatesIndexes.includes(index)) {
              setSubTodoCandidatesIndexes(prev => {
                return prev.filter(candidate => candidate !== index);
              });
            } else {
              setSubTodoCandidatesIndexes(prev => {
                return [...prev, index];
              });
            }
          }}
        >
          <Icon
            {...props}
            fill={
              subTodoCandidatesIndexes.includes(index)
                ? theme['color-primary-500']
                : theme['text-basic-color']
            }
            name="done-all-outline"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    setModalVisible(false);
  };

  const handleSubtodoSubmit = () => {
    if (subTodoInput !== '') {
      const modifiedDate = selectedDate.format('YYYY-MM-DD');
      const subTodoData = [
        {
          todo: item.id,
          content: subTodoInput,
          date: modifiedDate,
          isCompleted: false,
          order: tmpOrder(),
        },
      ];
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
        onPress={() => {
          handleLogEvent(DAILYTODO_LIST_CLICK_EVENT, {
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
        todoId={item.id}
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
