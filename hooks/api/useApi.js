import { useState, useCallback, useEffect } from 'react';
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

  const metadata = useCallback(() => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }, [accessToken]);

  const handleRequest = useCallback(
    async request => {
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
    },
    [accessToken],
  );

  const fetchTodos = useCallback(
    userId => {
      return handleRequest(() =>
        axios.get(`${API_PATH.todos}?user_id=${userId}`, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const addTodo = useCallback(
    todoData => {
      return handleRequest(() =>
        axios.post(API_PATH.todos, todoData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const deleteTodo = useCallback(
    ({ todoId }) => {
      return handleRequest(() =>
        axios.request({
          url: API_PATH.todos,
          method: 'DELETE',
          ...metadata(),
          data: { todo_id: todoId },
        }),
      );
    },
    [handleRequest, metadata],
  );

  const updateTodo = useCallback(
    ({ updateData }) => {
      return handleRequest(() =>
        axios.patch(API_PATH.todos, updateData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const verifyToken = useCallback(
    token => {
      return handleRequest(() => axios.post(API_PATH.verify, { token }));
    },
    [handleRequest],
  );

  const renewToken = useCallback(
    refreshToken => {
      return handleRequest(() =>
        axios.post(API_PATH.renew, {
          refresh: refreshToken,
          access: accessToken,
        }),
      );
    },
    [handleRequest, accessToken],
  );

  const googleLogin = useCallback(
    tokenData => {
      return handleRequest(() => axios.post(API_PATH.login, tokenData));
    },
    [handleRequest],
  );

  const getUserInfo = useCallback(() => {
    return handleRequest(() => axios.get(API_PATH.user, metadata()));
  }, [handleRequest, metadata]);

  const getCategory = useCallback(
    userId => {
      return handleRequest(() =>
        axios.get(`${API_PATH.categories}?user_id=${userId}`, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const addCategory = useCallback(
    categoryData => {
      return handleRequest(() =>
        axios.post(API_PATH.categories, categoryData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const updateCategory = useCallback(
    ({ updatedData }) => {
      return handleRequest(() =>
        axios.patch(API_PATH.categories, updatedData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const deleteCategory = useCallback(
    ({ categoryId }) => {
      return handleRequest(() =>
        axios.request({
          url: API_PATH.categories,
          method: 'DELETE',
          ...metadata(),
          data: { category_id: categoryId },
        }),
      );
    },
    [handleRequest, metadata],
  );

  const addSubTodo = useCallback(
    subTodoData => {
      return handleRequest(() =>
        axios.post(API_PATH.subTodos, subTodoData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const updateSubTodo = useCallback(
    ({ updatedData }) => {
      return handleRequest(() =>
        axios.patch(API_PATH.subTodos, updatedData, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const deleteSubTodo = useCallback(
    ({ subTodoId }) => {
      return handleRequest(() =>
        axios.request({
          url: API_PATH.subTodos,
          method: 'DELETE',
          ...metadata(),
          data: { subtodoId: subTodoId },
        }),
      );
    },
    [handleRequest, metadata],
  );

  const getInboxTodo = useCallback(
    userId => {
      return handleRequest(() =>
        axios.get(`${API_PATH.inbox}?user_id=${userId}`, metadata()),
      );
    },
    [handleRequest, metadata],
  );

  const getAndroidClientId = useCallback(() => {
    return handleRequest(() => axios.get(API_PATH.android));
  }, [handleRequest]);

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
