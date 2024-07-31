import { CategoryContext } from '@/contexts/CategoryContext';
import { DateContext } from '@/contexts/DateContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, Layout } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import DailyTodo from './DailyTodo';
import {
  DraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { LexoRank } from 'lexorank';

const DailyTodos = () => {
  const [input, setInput] = useState('');
  const { selectedCategory } = useContext(CategoryContext);

  // const addTodo = useTodoStore(state => state.addTodo);
  const currentTodos = useTodoStore(state => state.currentTodos);

  const renderTodo = ({ item, drag, isActive }) => {
    <ScaleDecorator>
      <DailyTodo item={item} drag={drag} isActive={isActive} />
    </ScaleDecorator>;
  };
  // const { date } = useContext(DateContext);
  const handleSubmit = async () => {
    // const startDate = date.split('T')[0];
    // const endDate = date.split('T')[0];
    // addTodo(startDate, endDate, input, selectedCategory);
    setInput('');
  };

  const handleDragEnd = ({ from, to, data: newData }) => {
    if (!newData || newData.length === 0) return;
    if (from === to) {
      return;
    }

    const newDataCopied = newData.map((item, index) => {
      if (index === to) {
        const updatedItem = { ...item };
        if (to === 0) {
          updatedItem.order = LexoRank.parse(newData[to + 1].order)
            .genPrev()
            .toString();
        } else if (to === newData.length - 1) {
          updatedItem.order = LexoRank.parse(newData[to - 1].order)
            .genNext()
            .toString();
        } else {
          const lexoOrderPrev = LexoRank.parse(newData[to - 1].order);
          const lexoOrderNext = LexoRank.parse(newData[to + 1].order);
          const lexoOrderMid = lexoOrderPrev.between(lexoOrderNext);
          updatedItem.order = lexoOrderMid.toString();
        }
        return updatedItem;
      }
      return item;
    });
    onTodos(newDataCopied);
  };
  return (
    <Layout>
      <DraggableFlatList
        data={currentTodos}
        renderItem={renderTodo}
        onDragEnd={handleDragEnd}
        ListFooterComponent={
          <Input
            placeholder="Place your Text"
            value={input}
            onChangeText={nextInput => {
              setInput(nextInput);
            }}
            autoFocus={true}
            onSubmitEditing={handleSubmit}
          />
        }
        ListFooterComponentStyle={{ paddingTop: 0 }}
      />
    </Layout>
  );
};

export default DailyTodos;
