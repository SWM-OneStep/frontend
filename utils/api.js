import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { API_PATH, BASE_URL } from './config';

const TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Token is invalid or expired';
const TOKEN_INVALID_TYPE_MESSAGE = 'Given token not valid for any token type';

class Api {
  async init() {
    this.accessToken = await AsyncStorage.getItem('accessToken');
    this.refreshToken = await AsyncStorage.getItem('refreshToken');
  }

  setAccessToken(newAccessToken) {
    this.accessToken = newAccessToken;
  }

  setRefreshToken(newRefreshToken) {
    this.refreshToken = newRefreshToken;
  }

  constructor() {
    if (Api.instance) {
      throw new Error('You can only create one instance!');
    }

    this.init();

    // Axios 인스턴스 생성 및 인터셉터 적용
    this.axiosInstance = axios.create({
      baseURL: BASE_URL, // API 기본 경로 설정
      timeout: 10000, // 타임아웃 설정
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (originalRequest.url === API_PATH.renew) {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('userName');
          router.replace('');
          return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const responseData = await this.axiosInstance.post(API_PATH.renew, {
              refresh: this.refreshToken,
            });
            const newAccessToken = responseData.data.access;
            await AsyncStorage.setItem('accessToken', newAccessToken);
            this.accessToken = newAccessToken;

            // 기존 요청에 새로운 토큰 적용
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (e) {
            Sentry.captureException(e);
            return Promise.reject(e);
          }
        }

        Sentry.captureException(error);
        return Promise.reject(error);
      },
    );
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  async request(url, options) {
    try {
      const response = await this.axiosInstance.request({
        url,
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data;
    } catch (e) {
      throw e;
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
