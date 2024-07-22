import { Input, Layout, List } from '@ui-kitten/components';
import { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import DailyTodo from './DailyTodo';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://10.0.2.2:8000/todos/';

const exampleTodos = [
  {
    category_id: 1,
    category_color: '#FFC0CB',
    category_name: 'work',
    user_id: 1,
    todos: [
      {
        content: 'Item 1',
        subTodos: [{ content: 'Sub Item 1.1' }, { content: 'Sub Item 1.2' }],
      },
      {
        content: 'Item 2',
        subTodos: [{ content: 'Sub Item 2.1' }, { content: 'Sub Item 2.2' }],
      },
    ],
  },
  {
    category_id: 2,
    category_color: '#FFC0CB',
    category_name: 'exercise',
    user_id: 1,
    todos: [
      {
        content: 'Item 3',
        subTodos: [{ content: 'Sub Item 3.1' }, { content: 'Sub Item 3.2' }],
      },
      {
        content: 'Item 4',
        subTodos: [{ content: 'Sub Item 4.1' }, { content: 'Sub Item 4.2' }],
      },
    ],
  },
];

const DailyTodos = () => {
  const todos = exampleTodos;

  // const todos = useTodoStore(state => state.todos);
  // const addTodo = useTodoStore(state => state.addTodo);
  // const fetchTodo = useTodoStore(state => state.fetchTodo);

  // useEffect(() => {
  //   fetchTodo();
  // }, [fetchTodo]);

  const getFirstCategoryId = data => {
    let categoryIds = [];
    data.forEach(todo => {
      categoryIds.push(todo.category_id);
    });
    return categoryIds[0];
  };

  const [input, setInput] = useState('');
  const [categoryId, setCategoryId] = useState(getFirstCategoryId(todos));

  const renderSubTodo = ({ item }) => {
    return <DailyTodo item={item} />;
  };

  const renderTodo = ({ item, index }) => {
    return (
      <View>
        <DailyTodo item={item} />
        <List data={item.subTodos} renderItem={renderSubTodo} />
      </View>
    );
  };
  const handleSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    const categoryId = '1';
    // addTodo(startDate, endDate, input, categoryId);
    setInput('');
  };

  return (
    <KeyboardAvoidingView>
      <Layout>
        <List
          data={todos.filter(todo => todo.category_id === categoryId)}
          renderItem={renderTodo}
          contentContainerStyle={{ paddingBottom: 200 }}
          ListFooterComponent={
            <Input
              placeholder="Place your Text"
              value={input}
              onChangeText={nextInput => setInput(nextInput)}
              onSubmitEditing={handleSubmit}
            />
          }
          ListFooterComponentStyle={{ paddingTop: 0, paddingBottom: 125 }}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default DailyTodos;
