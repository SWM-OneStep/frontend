import useTodoStore from '@/contexts/TodoStore';
import { Input, Layout, List } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import DailyTodo from '@/components/DailyTodo';

const todosApi =
  'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://10.0.2.2:8000/todos/';

const DailyTodos = () => {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const fetchTodo = useTodoStore(state => state.fetchTodo);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);
  const [input, setInput] = useState('');
  const renderTodo = ({ item, index }) => {
    return <DailyTodo item={item} index={index} />;
  };
  const handleSubmit = async () => {
    addTodo(input);
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
