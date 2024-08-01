// const BASE_URL =
//   'http://ec2-43-201-109-163.ap-northeast-2.compute.amazonaws.com:8000';

const BASE_URL = 'http://10.0.2.2:8000';

export const API_PATH = {
  categories: `${BASE_URL}/todos/category/`,
  todos: `${BASE_URL}/todos/todo/`,
  subTodos: `${BASE_URL}/todos/sub/`,
  refresh: `${BASE_URL}/token/refresh/`,
  verify: `${BASE_URL}/auth/api/token/verify/`,
  today: `${BASE_URL}/todos/today/`,
  login: `${BASE_URL}/auth/login/google/`,
  user: `${BASE_URL}/auth/user/`,
};
