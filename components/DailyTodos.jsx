import DailyTodo from '@/components/DailyTodo';
import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import {
  useTodoAddMutation,
  useTodoUpdateMutation,
} from '@/hooks/useTodoMutations';
import { default as useTodosQuery } from '@/hooks/useTodoQuery';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
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
import { LexoRank } from 'lexorank';
import { Fragment, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { mutate: updateTodo } = useTodoUpdateMutation();
  const setCurrentTodos = useTodoStore(state => state.setCurrentTodos);
  const ExistingOrders = useTodoStore(state => state.ExistingOrders);
  const { mutate: addTodo } = useTodoAddMutation();
  const { selectedDate } = useContext(DateContext);
  const {
    isLoading,
    error,
    data,
    isSuccess: isTodosQuerySuccess,
  } = useTodosQuery(accessToken, userId);
  const currentTodos = useTodoStore(state => state.currentTodos);

  useEffect(() => {
    if (isTodosQuerySuccess) {
      useTodoStore.setState({ todos: data });
      let filteredTodos = data.filter(
        todo =>
          todo.categoryId === selectedCategory &&
          isTodoIncludedInTodayView(
            todo.startDate,
            todo.endDate,
            selectedDate.format('YYYY-MM-DD'),
          ),
      );
      useTodoStore.setState({ currentTodos: filteredTodos });
    }
  }, [isTodosQuerySuccess, data, selectedCategory, selectedDate]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <DailyTodo item={item} drag={drag} isActive={isActive} />
      </ScaleDecorator>
    );
  };
  // const { date } = useContext(DateContext);

  const handleDragEnd = ({ from, to, data: newData }) => {
    if (!newData || newData.length === 0) return;
    if (from === to) {
      return;
    }

    let updatedOrder;
    let prevTodoId = null;
    let nextTodoId = null;

    const ensureUniqueOrder = order => {
      let uniqueOrder = order;
      while (true) {
        if (!ExistingOrders.includes(uniqueOrder.toString())) {
          break;
        }
        if (to === 0) {
          uniqueOrder = uniqueOrder.genPrev();
        } else if (to === newData.length - 1) {
          uniqueOrder = uniqueOrder.genNext();
        } else {
          const lexoOrderPrev = uniqueOrder;
          const lexoOrderNext = LexoRank.parse(newData[to + 1].order);
          uniqueOrder = lexoOrderPrev.between(lexoOrderNext);
        }
      }
      return uniqueOrder.toString();
    };

    const orderedNewData = newData.map((item, index) => {
      if (index !== to) {
        return item;
      }
      let proposedOrder;
      if (to === 0) {
        proposedOrder = LexoRank.parse(newData[to + 1].order).genPrev();
        nextTodoId = newData[to + 1].id;
      } else if (to === newData.length - 1) {
        proposedOrder = LexoRank.parse(newData[to - 1].order).genNext();
        prevTodoId = newData[to - 1].id;
      } else {
        const lexoOrderPrev = LexoRank.parse(newData[to - 1].order);
        const lexoOrderNext = LexoRank.parse(newData[to + 1].order);
        proposedOrder = lexoOrderPrev.between(lexoOrderNext);
        prevTodoId = newData[to - 1].id;
        nextTodoId = newData[to + 1].id;
      }
      updatedOrder = ensureUniqueOrder(proposedOrder);
      return {
        ...item,
        order: updatedOrder,
      };
    });
    setCurrentTodos(orderedNewData);
    const updatedData = {
      todo_id: newData[to].id,
      order: {
        prev_id: prevTodoId,
        next_id: nextTodoId,
        updated_order: updatedOrder,
      },
    };
    updateTodo({ accessToken, updatedData });
  };

  const handleSubmit = async () => {
    const todos = useTodoStore.getState().todos;
    const newTodoData = {
      userId: parseInt(userId, 10),
      startDate: selectedDate.format('YYYY-MM-DD'),
      endDate: selectedDate.format('YYYY-MM-DD'),
      content: input,
      categoryId: selectedCategory,
      order:
        todos.length > 0
          ? LexoRank.parse(todos[todos.length - 1].order)
              .genNext()
              .toString()
          : LexoRank.middle().toString(),
    };

    addTodo({ accessToken, todoData: newTodoData });
    setInput('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Fragment>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
              style={styles.input}
              placeholder="Add a new task"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => {
                handleLogEvent(TODAYVIEW_TEXTINPUT_SUBMIT_EVENT, {
                  time: new Date().toISOString(),
                  userId: userId,
                });
                handleSubmit();
              }}
            />
          </View>
        </KeyboardAccessoryView>
      </Fragment>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 0,
    padding: 0,
  },
});

export default DailyTodos;
