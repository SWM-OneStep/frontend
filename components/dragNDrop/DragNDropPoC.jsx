import { View, KeyboardAvoidingView } from 'react-native';
import { React, useState } from 'react';
import { ListItem, Layout, List } from '@ui-kitten/components';
import DailyTodo from '../DailyTodo';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const DragNDropPoC = () => {
  const [data, setData] = useState(study_todos);

  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <DailyTodo item={item} drag={drag} isActive={isActive} />
    </ScaleDecorator>
  );
  return (
    <KeyboardAvoidingView>
      <Layout>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data: newData }) => setData(newData)}
          keyExtractor={item => item.id}
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
    parent_id: null,
    is_completed: false,
    subTodos: [
      {
        id: 1,
        content: '1장',
        parent_id: 1,
        is_completed: false,
      },
    ],
  },
  {
    id: 2,
    content: '과학 숙제',
    deadline: '2021-08-25T00:00:00.000Z',
    parent_id: null,
    is_completed: false,
  },
];
