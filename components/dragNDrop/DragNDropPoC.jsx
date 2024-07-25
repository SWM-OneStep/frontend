import { KeyboardAvoidingView } from 'react-native';
import { React, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import DailyTodo from '../DailyTodo';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { LexoRank } from 'lexorank';

const DragNDropPoC = () => {
  const [data, setData] = useState(study_todos);

  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <DailyTodo item={item} drag={drag} isActive={isActive} />
    </ScaleDecorator>
  );

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
    console.log('from', from, 'to', to);
    console.log('data:', JSON.stringify(newDataCopied, undefined, 2));
    setData(newDataCopied);
  };

  return (
    <KeyboardAvoidingView>
      <Layout>
        <DraggableFlatList
          data={data}
          onDragEnd={handleDragEnd}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 200 }}
          ListFooterComponentStyle={{ paddingTop: 0, paddingBottom: 125 }}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default DragNDropPoC;

// category가 select 되었다고 했을 때
// item.todos일 때 상황을 가정
const study_todos = [
  {
    id: 1,
    content: '수학 숙제',
    is_completed: false,
    order: '0|hzzzzz:',
  },
  {
    id: 2,
    content: '과학 숙제',
    is_completed: false,
    order: '0|izzzzz:',
  },
  {
    id: 3,
    content: '영어 숙제',
    is_completed: false,
    order: '0|kzzzzz:',
  },
];
