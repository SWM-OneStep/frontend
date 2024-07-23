import { CategoryContext } from '@/contexts/CategoryContext';
import useTodoStore from '@/contexts/TodoStore';
import { Input, Layout, List } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import DailyTodo from './DailyTodo';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://10.0.2.2:8000/todos/';

const DailyTodos = ({ todos }) => {
  const addTodo = useTodoStore(state => state.addTodo);

  const [input, setInput] = useState('');
  const { selectedCategory } = useContext(CategoryContext);

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
    addTodo(startDate, endDate, input, selectedCategory);
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
