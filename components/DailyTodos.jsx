import { List } from '@ui-kitten/components';
import DailyTodo from './DailyTodo';
import TodoInput from './TodoInput';

const DailyTodos = ({ todos }) => {
  const renderTodo = ({ item, index }) => {
    return <DailyTodo item={item} key={index} />;
  };

  return (
    <List
      data={todos}
      renderItem={renderTodo}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListFooterComponent={<TodoInput />}
      ListFooterComponentStyle={{ paddingTop: 0, paddingBottom: 125 }}
    />
  );
};

export default DailyTodos;
