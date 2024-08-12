import { env } from '@/constants/env';

const BASE_URL = env.BASE_URL;

export const API_PATH = {
  categories: `${BASE_URL}/todos/category/`,
  todos: `${BASE_URL}/todos/todo/`,
  subTodos: `${BASE_URL}/todos/sub/`,
  refresh: `${BASE_URL}/token/refresh/`,
  verify: `${BASE_URL}/auth/api/token/verify/`,
  renew: `${BASE_URL}/auth/token/refresh/`,
  today: `${BASE_URL}/todos/today/`,
  login: `${BASE_URL}/auth/login/google/`,
  user: `${BASE_URL}/auth/user/`,
  inbox: `${BASE_URL}/todos/inbox/`,
  recommend: `${BASE_URL}/todos/recommend/`,
};
