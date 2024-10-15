import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { API_PATH } from '@/utils/config';
import * as Sentry from '@sentry/react-native';

const TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Token is invalid or expired';
const TOKEN_INVALID_TYPE_MESSAGE = 'Given token not valid for any token type';

export function useApi() {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(token => {
      setAccessToken(token);
    });
  }, []);

  const metadata = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  const handleRequest = async request => {
    try {
      const response = await request();
      return response.data;
    } catch (err) {
      if (
        (err.response?.status === 401 &&
          err.response?.data?.detail === TOKEN_INVALID_OR_EXPIRED_MESSAGE) ||
        err.response?.data?.detail === TOKEN_INVALID_TYPE_MESSAGE
      ) {
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const responseData = await axios.post(API_PATH.renew, {
            refresh: refreshToken,
            access: accessToken,
          });
          await AsyncStorage.setItem('accessToken', responseData.data.access);
          setAccessToken(responseData.data.access);
          const secondRequest = await request();
          return secondRequest.data;
        } catch (refreshError) {
          Sentry.captureException(refreshError);

          if (refreshError.response?.status === 401) {
            await AsyncStorage.multiRemove([
              'accessToken',
              'refreshToken',
              'userId',
            ]);
            router.replace('');
          } else {
            throw refreshError;
          }
        }
      }
      Sentry.captureException(err);
      throw err;
    }
  };

  const fetchTodos = userId => {
    return handleRequest(() =>
      axios.get(`${API_PATH.todos}?user_id=${userId}`, metadata()),
    );
  };

  const addTodo = todoData => {
    return handleRequest(() =>
      axios.post(API_PATH.todos, todoData, metadata()),
    );
  };

  const deleteTodo = ({ todoId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.todos,
        method: 'DELETE',
        ...metadata(),
        data: { todo_id: todoId },
      }),
    );
  };

  const updateTodo = ({ updateData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.todos, updateData, metadata()),
    );
  };

  const verifyToken = token => {
    return handleRequest(() => axios.post(API_PATH.verify, { token }));
  };

  const renewToken = refreshToken => {
    return handleRequest(() =>
      axios.post(API_PATH.renew, {
        refresh: refreshToken,
        access: accessToken,
      }),
    );
  };

  const googleLogin = tokenData => {
    return handleRequest(() => axios.post(API_PATH.login, tokenData));
  };

  const getUserInfo = () => {
    return handleRequest(() => axios.get(API_PATH.user, metadata()));
  };

  const getCategory = userId => {
    return handleRequest(() =>
      axios.get(`${API_PATH.categories}?user_id=${userId}`, metadata()),
    );
  };

  const addCategory = categoryData => {
    return handleRequest(() =>
      axios.post(API_PATH.categories, categoryData, metadata()),
    );
  };

  const updateCategory = ({ updatedData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.categories, updatedData, metadata()),
    );
  };

  const deleteCategory = ({ categoryId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.categories,
        method: 'DELETE',
        ...metadata(),
        data: { category_id: categoryId },
      }),
    );
  };

  const addSubTodo = subTodoData => {
    return handleRequest(() =>
      axios.post(API_PATH.subTodos, subTodoData, metadata()),
    );
  };

  const updateSubTodo = ({ updatedData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.subTodos, updatedData, metadata()),
    );
  };

  const deleteSubTodo = ({ subTodoId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.subTodos,
        method: 'DELETE',
        ...metadata(),
        data: { subtodoId: subTodoId },
      }),
    );
  };

  const getInboxTodo = userId => {
    return handleRequest(() =>
      axios.get(`${API_PATH.inbox}?user_id=${userId}`, metadata()),
    );
  };

  const getAndroidClientId = () => {
    return handleRequest(() => axios.get(API_PATH.android));
  };

  return {
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    verifyToken,
    renewToken,
    googleLogin,
    getUserInfo,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubTodo,
    updateSubTodo,
    deleteSubTodo,
    getInboxTodo,
    getAndroidClientId,
  };
}
