import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const todosApi = 'http://10.0.2.2:8000/todos/';

const useTodoStore = create(set => ({
  todos: [],
  selectedCategory: null,
  setSelectedCategory: category => {
    set({ selectedCategory: category });
  },
  addTodo: async (startDate, endDate, content, categoryId) => {
    const apiData = {
      start_date: startDate,
      end_date: endDate,
      content: content,
      category_id: categoryId,
    };
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await fetch(todosApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify(apiData),
    });
    const responseData = await response.json();
    const todo = responseData;
    set(state => ({ todos: [...state.todos, todo] }));
    return responseData.id;
  },
  deleteTodo: async id => {
    const bodyData = {
      user_id: 1,
      todo_id: id,
    };
    const response = await fetch(`${todosApi}?user_id=1&todo_id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    const responseData = await response.json();
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  },
  editTodo: async todo => {
    const editData = {
      user_id: 1,
      todo_id: todo.id,
      content: todo.content,
    };
    const response = await fetch(todosApi, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(editData),
    });
    await response.json();
    set(state => ({
      todos: state.todos.map(t => (t.id === todo.id ? todo : t)),
    }));
  },
  fetchTodo: async () => {
    const response = await fetch(`${todosApi}?user_id=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    set({ todos: responseData });
  },
  toggleTodo: async todo => {
    const changedTodoApiData = {
      todo_id: todo.id,
      user_id: '1',
      is_completed: !todo.is_completed,
    };
    let changedTodoFrontData = todo;
    changedTodoFrontData.is_completed = !todo.is_completed;

    const response = await fetch(todosApi, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedTodoApiData),
    });
    await response.json();
    set(state => ({
      todos: state.todos.map(t =>
        t.id === todo.id ? changedTodoFrontData : t,
      ),
    }));
  },
}));

export default useTodoStore;