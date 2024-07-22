import { Input, Layout, List } from '@ui-kitten/components';
import { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import DailyTodo from './DailyTodo';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://10.0.2.2:8000/todos/';

const DailyTodos = ({ todos }) => {
  // const todos = useTodoStore(state => state.todos);
  // const addTodo = useTodoStore(state => state.addTodo);
  // const fetchTodo = useTodoStore(state => state.fetchTodo);

  // useEffect(() => {
  //   fetchTodo();
  // }, [fetchTodo]);

  const getFirstCategoryId = data => {
    let categoryIds = [];
    console.log('getFirstCategoryId', data);
    data.forEach(todo => {
      categoryIds.push(todo.category_id);
    });
    return categoryIds[0];
  };

  const [input, setInput] = useState('');
  console.log('DailyTodos todos', todos);
  const [categoryId, setCategoryId] = useState(getFirstCategoryId(todos));

  const renderTodo = ({ item, index }) => {
    return (
      <View>
        <DailyTodo item={item} />
      </View>
    );
  };
  const handleSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    const categoryId = 1;
    // addTodo(startDate, endDate, input, categoryId);
    setInput('');
  };

  return (
    <KeyboardAvoidingView>
      <Layout>
        <List
          data={todos}
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
