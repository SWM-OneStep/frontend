import { createContext, useContext, useReducer } from 'react';

const TodosContext = createContext(null);
const TodoIdContext = createContext(null);
const TodosDispatchContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        <TodoIdContext.Provider value={todos.length}>
          {children}
        </TodoIdContext.Provider>
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

export function useTodoId() {
  return useContext(TodoIdContext);
}

function todosReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
          date: action.date,
        },
      ];
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTodos = [
  { id: 0, text: 'Buy a milk', done: false, date: '2024-07-16' },
];
