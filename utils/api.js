import { LOCAL_API } from './config';
import axios from 'axios';

const metadata = accessToken => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
};

export const Api = {
  fetchTodos: (accessToken, userId) => {
    return axios
      .get(`${LOCAL_API.todos}?user_id=${userId}`, metadata(accessToken))
      .catch(err => {
        console.log(err);
      });
  },
  verifyToken: accessToken => {
    return axios
      .post(`${LOCAL_API.verifyToken}`, metadata(accessToken))
      .catch(err => {
        console.log(err);
      });
  },
  login: (tokenData, accessToken) => {
    return axios
      .post(`${LOCAL_API.login}`, tokenData, metadata(accessToken))
      .catch(err => {
        console.log(err);
      });
  },
  getUserInfo: accessToken => {
    return axios.get(LOCAL_API.user, metadata(accessToken)).catch(err => {
      console.log(err);
    });
  },
};
