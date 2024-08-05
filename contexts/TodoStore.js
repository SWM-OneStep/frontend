import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
import { create } from 'zustand';

// const todosApi =
//   'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const todosTodayApi = 'http://10.0.2.2:8000/todos/today/';
const todosApi = 'http://10.0.2.2:8000/todos/todo/';
const subTodosApi = 'http://10.0.2.2:8000/todos/sub/';

const useTodoStore = create((set, get) => ({
  todos: [],
  currentTodos: [],
  inboxTodos: [],
  inboxCurrentTodos: [],
  selectedTodo: null,
  ExistingOrders: [],

  setExistingOrders: orders => {
    set(() => ({ ExistingOrders: orders }));
  },

  setSelectedTodo: todo => {
    set(state => ({ selectedTodo: todo }));
  },

  setCurrentTodos: todos => {
    set(() => ({ currentTodos: todos }));
  },

  setInboxTodos: todos => {
    set(state => ({ inboxTodos: todos }));
  },
  setInboxCurrentTodos: todos => {
    set(state => ({ inboxCurrentTodos: todos }));
  },
  addTodo: async (startDate, endDate, content, categoryId) => {
    const apiData = {
      start_date: startDate,
      end_date: endDate,
      content: content,
      user_id: '1',
      order: 'dshfgsfks',
      category_id: categoryId,
      is_completed: false,
    };
    // const accessToken = await AsyncStorage.getItem('accessToken');
    // const response = await fetch(todosApi, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: 'Bearer ' + accessToken,
    //   },
    //   body: JSON.stringify(apiData),
    // });
    // const responseData = await response.json();
    // const todo = responseData;
    // set(state => ({ todos: [...state.todos, todo] }));
    // set(state => ({ currentTodos: [...state.currentTodos, todo] }));
  },
  addSubTodo: async (content, todo, date, order) => {
    const modifiedOrder = order ? order : '0:hzzzzzzz';
    const apiData = {
      content: content,
      todo: todo.id,
      date: date,
      order: modifiedOrder,
    };
    const response = await fetch(subTodosApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });
    const responseData = await response.json();
    let currentSubTodos = todo.subtodos;
    currentSubTodos.push(responseData);
    let modifiedTodo = [];
    if (Array.isArray(get().currentTodos)) {
      get().currentTodos.forEach(t => {
        if (t.id === todo.id) {
          t.subtodos = currentSubTodos;
          modifiedTodo.push(t);
        } else {
          modifiedTodo.push(t);
        }
      });
    }
    set(state => ({ currentTodos: modifiedTodo }));
    modifiedTodo = [];
    if (Array.isArray(get().todos)) {
      get().currentTodos.forEach(t => {
        if (t.id === todo.id) {
          t.subtodos = currentSubTodos;
          modifiedTodo.push(t);
        } else {
          modifiedTodo.push(t);
        }
      });
    }
    set(state => ({ todos: modifiedTodo }));
  },
  findTodoById: id => {
    let selectedTodo = null;
    if (Array.isArray(get().currentTodos)) {
      get().currentTodos.forEach(todo => {
        if (todo.id === id) {
          selectedTodo = todo;
        }
      });
    }
    return selectedTodo;
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
    await response.json();
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
    set(state => ({
      currentTodos: state.currentTodos.filter(todo => todo.id !== id),
    }));
  },

  editTodo: async (todo, content) => {
    const editData = {
      todo_id: todo.id,
      content: content,
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
    set(state => ({
      currentTodos: state.currentTodos.map(t => (t.id === todo.id ? todo : t)),
    }));
  },

  fetchTodo: async () => {
    const response = await fetch(`${todosTodayApi}?user_id=1`, {
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
      user_id: 1,
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

  filterTodoByCategory: async categoryId => {
    let filteredTodos = null;
    if (Array.isArray(get().todos)) {
      get().todos.forEach(todo => {
        if (todo.id === categoryId) {
          filteredTodos = todo.todos;
        }
      });
    }
    if (filteredTodos != null) {
      set(state => ({
        currentTodos: filteredTodos,
      }));
    } else {
      set(state => ({
        currentTodos: [],
      }));
    }
  },

  filterTodoByDate: async date => {
    let filteredTodos = [];
    if (Array.isArray(get().currentTodos)) {
      get().currentTodos.forEach(todo => {
        if (isTodoIncludedInTodayView(todo.startDate, todo.endDate, date)) {
          filteredTodos.push(todo);
        }
      });
    }
    set(state => ({
      currentTodos: filteredTodos,
    }));
  },
}));

export default useTodoStore;
