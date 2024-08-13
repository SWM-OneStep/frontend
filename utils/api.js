import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { API_PATH } from './config';

const TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Token is invalid or expired';
const TOKEN_INVALID_TYPE_MESSAGE = 'Given token not valid for any token type';

const Api = () => {
  const handleRequest = async request => {
    try {
      const response = await request();
      return response.data;
    } catch (err) {
      Sentry.captureException(err);
      if (
        (err.response.status === 401 &&
          err.response.data.detail === TOKEN_INVALID_OR_EXPIRED_MESSAGE) ||
        err.response.data.detail === TOKEN_INVALID_TYPE_MESSAGE
      ) {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const responseData = await axios.post(API_PATH.renew, {
            refresh: refreshToken,
            access: accessToken,
          });
          await AsyncStorage.setItem('accessToken', responseData.data.access);
          const secondRequest = await request();
          return secondRequest.data;
        } catch (refreshError) {
          if (refreshError.response.status === 401) {
            router.replace('index');
          } else {
            throw refreshError;
          }
        }
      } else {
        throw err;
      }
    }
  };

  const metadata = accessToken => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    return { headers };
  };

  const getCategory = (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(
        `${API_PATH.categories}?user_id=${userId}`,
        metadata(accessToken),
      ),
    );
  };

  const addCategory = (accessToken, addCategoryData) => {
    return handleRequest(() =>
      axios.post(API_PATH.categories, addCategoryData, metadata(accessToken)),
    );
  };

  const getInboxTodo = (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.inbox}?user_id=${userId}`, metadata(accessToken)),
    );
  };

  return {
    getCategory,
    addCategory,
    getInboxTodo,
  };
};

export default Api;
