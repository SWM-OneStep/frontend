import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import axios from 'axios';
import { API_PATH } from './config';

const TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Token is invalid or expired';
const TOKEN_INVALID_TYPE_MESSAGE = 'Given token not valid for any token type';

class Api {
  async init() {
    this.accessToken = await AsyncStorage.getItem('accessToken');
    this.refreshToken = await AsyncStorage.getItem('refreshToken');
  }

  constructor() {
    if (Api.instance) {
      throw new Error('You can only create one instance!');
    }
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  async request(url, options) {
    try {
      return axios.request(url, {
        ...options,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      });
    } catch (e) {
      Sentry.captureException(e);
      if (axios.isAxiosError(e)) {
        if (
          (e.response.status === 401 &&
            e.response.data.detail === TOKEN_INVALID_OR_EXPIRED_MESSAGE) ||
          e.response.data.detail === TOKEN_INVALID_TYPE_MESSAGE
        ) {
          // access token 재발급
          const responseData = await axios.post(API_PATH.renew, {
            refresh: this.refreshToken,
            access: this.accessToken,
          });
          const newAccessToken = responseData.data.access;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          this.accessToken = newAccessToken;

          // 다시 요청
          return axios.request(url, {
            ...options,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          });
        }
      }
    }
  }

  fetchTodos(userId) {
    return this.request(`${API_PATH.todos}?user_id=${userId}`, {
      method: 'GET',
    });
  }

  addTodo(todoData) {
    return this.request(API_PATH.todos, {
      method: 'POST',
      data: todoData,
    });
  }

  deleteTodo(todoId) {
    return this.request(API_PATH.todos, {
      method: 'DELETE',
      data: { todo_id: todoId },
    });
  }

  updateTodo(updateData) {
    return this.request(API_PATH.todos, {
      method: 'PATCH',
      data: updateData,
    });
  }

  verifyToken(token) {
    return this.request(API_PATH.verify, {
      method: 'POST',
      data: { token },
    });
  }

  renewToken(accessToken, refreshToken) {
    return this.request(API_PATH.renew, {
      method: 'POST',
      data: {
        refresh: refreshToken,
        access: accessToken,
      },
    });
  }

  googleLogin(tokenData) {
    return this.request(API_PATH.login, {
      method: 'POST',
      data: tokenData,
    });
  }

  getUserInfo() {
    return this.request(API_PATH.user, {
      method: 'GET',
    });
  }

  getCategory(userId) {
    return this.request(`${API_PATH.categories}?user_id=${userId}`, {
      method: 'GET',
    });
  }

  addCategory(categoryData) {
    return this.request(API_PATH.categories, {
      method: 'POST',
      data: categoryData,
    });
  }

  addSubTodo(subTodoData) {
    return this.request(API_PATH.subTodos, {
      method: 'POST',
      data: subTodoData,
    });
  }

  updateSubTodo(updatedData) {
    return this.request(API_PATH.subTodos, {
      method: 'PATCH',
      data: updatedData,
    });
  }

  deleteSubTodo(subTodoId) {
    return this.request(API_PATH.subTodos, {
      method: 'DELETE',
      data: { subtodoId: subTodoId },
    });
  }

  getInboxTodo(userId) {
    return this.request(`${API_PATH.inbox}?user_id=${userId}`, {
      method: 'GET',
    });
  }
  recommendSubTodo(todoId, onSuccess) {
    return axios
      .get(`${API_PATH.recommend}?todo_id=${todoId}`)
      .then(onSuccess)
      .catch(error => {
        Sentry.captureException(error);
      });
  }
}

export default Api;
