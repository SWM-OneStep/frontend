import DailyTodo from '@/components/DailyTodo';
import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import useTodosQuery from '@/hooks/api/useTodoQuery';
import useCreateTodo from '@/hooks/todo/useCreateTodo';
import useFilteredTodos from '@/hooks/todo/useFilteredTodo';
import useHandleDrag from '@/hooks/todo/useHandleDrag';
import '@/locales/index';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  handleScroll,
} from '@/utils/handleScroll';
import {
  handleLogEvent,
  TODAYVIEW_SCROLL_EVENT,
  TODAYVIEW_TEXTINPUT_SUBMIT_EVENT,
} from '@/utils/logEvent';
import { Input } from '@ui-kitten/components';
import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

const DailyTodos = () => {
  const { userId } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { selectedDate } = useContext(DateContext);
  const { isLoading, error, data: todosData } = useTodosQuery(userId);
  const { t, i18n } = useTranslation();

  const currentTodos = useFilteredTodos(
    todosData,
    selectedCategory,
    selectedDate,
  );
  const setCurrentTodos = useTodoStore(state => state.setCurrentTodos);

  const handleDragEnd = useHandleDrag(currentTodos, setCurrentTodos);

  const { input, setInput, handleSubmit } = useCreateTodo(
    userId,
    selectedCategory,
    selectedDate,
  );
  const { t, i18n } = useTranslation();

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <DailyTodo item={item} drag={drag} isActive={isActive} />
      </ScaleDecorator>
    );
  };

  const handleInputSubmit = () => {
    handleLogEvent(TODAYVIEW_TEXTINPUT_SUBMIT_EVENT, {
      time: new Date().toISOString(),
      userId: userId,
    });
    handleSubmit();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Fragment>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, backgroundColor: 'white' }}
        >
          <DraggableFlatList
            data={currentTodos}
            renderItem={renderTodo}
            onDragEnd={handleDragEnd}
            keyExtractor={item => item.id.toString()}
            onScroll={event =>
              handleScroll(TODAYVIEW_SCROLL_EVENT, userId, event)
            }
            scrollEventThrottle={DEFAULT_SCROLL_EVENT_THROTTLE}
          />
        </KeyboardAvoidingView>
        <KeyboardAccessoryView alwaysVisible androidAdjustResize>
          <View>
            <Input
              placeholder={t('components.dailyTodos.writeTodo')}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleInputSubmit}
            />
          </View>
        </KeyboardAccessoryView>
      </Fragment>
    </GestureHandlerRootView>
  );
};

export default DailyTodos;
