const LOCAL_BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://10.0.2.2:8000';

export const API = {
  categories: `${BASE_URL}/todos/category/`,
  todos: `${BASE_URL}/todos/todo/`,
  subTodos: `${BASE_URL}/todos/sub/`,
  users: `${BASE_URL}/users/`,
  refresh: `${BASE_URL}/token/refresh/`,
  verify: `${BASE_URL}/token/verify/`,
  today: `${BASE_URL}/todos/today/`,
  login: `${BASE_URL}/auth/login/google/`,
  user: `${BASE_URL}/auth/user/`,
};

export const LOCAL_API = {
  categories: `${LOCAL_BASE_URL}/todos/category/`,
  todos: `${LOCAL_BASE_URL}/todos/todo/`,
  subTodos: `${LOCAL_BASE_URL}/todos/sub/`,
  users: `${LOCAL_BASE_URL}/users/`,
  refresh: `${LOCAL_BASE_URL}/token/refresh/`,
  verify: `${LOCAL_BASE_URL}/token/verify/`,
  today: `${LOCAL_BASE_URL}/todos/today/`,
  login: `${BASE_URL}/auth/login/google/`,
  user: `${BASE_URL}/auth/user/`,
};
