import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import {
  useTodoAddMutation,
  useTodoUpdateMutation,
} from '@/hooks/useTodoMutations';
import TODO_QUERY_KEY from '@/hooks/useTodoQuery';
import { useQueryClient } from '@tanstack/react-query';
import { Input, List } from '@ui-kitten/components';
import { LexoRank } from 'lexorank';
import { Fragment, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import DailyTodo from './DailyTodo';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { set } from 'date-fns';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { userId, accessToken } = useContext(LoginContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { mutate: addTodo, isSuccess } = useTodoAddMutation();
  const { mutate: updateTodo } = useTodoUpdateMutation();
  const setCurrentTodos = useTodoStore(state => state.setCurrentTodos);
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const ExistingOrders = useTodoStore(state => state.ExistingOrders);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(TODO_QUERY_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const currentTodos = useTodoStore(state => state.currentTodos);
  // console.log('currentTodos in DailyTodos', currentTodos);

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
    <Fragment>
      <DraggableFlatList
        data={currentTodos}
        renderItem={renderTodo}
        onDragEnd={handleDragEnd}
        keyExtractor={item => item.id.toString()}
        ListFooterComponentStyle={{ paddingTop: 0, flex: 1 }}
      />
      {/* <KeyboardAvoidingView> */}
      <Input
        placeholder="Place your Text"
        value={input}
        onChangeText={nextInput => {
          setInput(nextInput);
        }}
        autoFocus={false}
        onSubmitEditing={handleSubmit}
      />
      {/* </KeyboardAvoidingView> */}
    </Fragment>
  );
};

export default DailyTodos;
