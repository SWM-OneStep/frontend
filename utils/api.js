import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { API_PATH } from './config';
import * as Sentry from '@sentry/react-native';

const metadata = async accessToken => {
  let headers = null;
  if (accessToken) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    const recentAccessToken = await AsyncStorage.getItem('accessToken');
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${recentAccessToken}`,
    };
  }

  return { headers };
};

const TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Token is invalid or expired';
const TOKEN_INVALID_TYPE_MESSAGE = 'Given token not valid for any token type';

const handleRequest = async request => {
  try {
    const response = await request();
    return response.data;
  } catch (err) {
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
        Sentry.captureException(err);

        if (refreshError.response.status === 401) {
          router.replace('index');
        } else {
          throw refreshError;
        }
      }
    }
    Sentry.captureException(err);
  }
};

export const Api = {
  // get /todos/todo/ 에서 시작날과 끝날 입력 형식은 뭐지 일단 userId만!
  /**
   * 서버로부터 사용자의 todo를 받아온다.
   *
   */
  fetchTodos: (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.todos}?user_id=${userId}`, metadata()),
    );
  },
  /**
   * 서버에 새로운 할 일을 추가합니다.
   *
   * @param {Object} params - 요청에 필요한 매개변수.
   * @param {string} params.accessToken - 인증을 위한 액세스 토큰.
   * @param {Object} params.todoData - 추가할 할 일의 데이터.
   * @param {string} params.todoData.content - 할 일의 내용.
   * @param {number} params.todoData.categoryId - 할 일의 카테고리 ID.
   * @param {string} params.todoData.startDate - 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @param {string} params.todoData.endDate - 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @param {number} params.todoData.userId - 할 일과 연관된 사용자 ID.
   * @param {string} params.todoData.order - 할 일의 순서 문자열.
   * @param {boolean} params.todoData.isCompleted - 할 일의 완료 여부.
   * @returns {Promise<Object>} 새로 추가된 할 일 객체를 반환하는 프로미스.
   * @throws {Error} 요청이 실패할 경우 에러를 던집니다.
   */
  addTodo: (accessToken, todoData) => {
    return handleRequest(() =>
      axios.post(API_PATH.todos, todoData, metadata()),
    );
  },
  /**
   * 이 함수는 todo를 삭제하는 함수입니다.
   * * 요청 본문 형식:
   * {
   *   "todo_id": 0
   * }
   *
   * 반환되는 객체 형식:
   * @property {number} id - 삭제된 할 일의 ID.
   * @property {string} content - 삭제된 할 일의 내용.
   * @property {number} categoryId - 삭제된 할 일의 카테고리 ID.
   * @property {string} [startDate] - 삭제된 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @property {string} [endDate] - 삭제된 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @property {number} userId - 삭제된 할 일의 사용자 ID.
   * @property {string} order - 삭제된 할 일의 순서.
   * @property {boolean} isCompleted - 삭제된 할 일의 완료 여부.
   */
  deleteTodo: ({ accessToken, todoId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.todos,
        method: 'DELETE',
        headers: metadata(),
        data: { todo_id: todoId },
      }),
    );
  },
  /**
   * 서버에서 할 일의 정보를 업데이트합니다.
   *
   * @param {Object} params - 요청에 필요한 매개변수.
   * @param {string} params.accessToken - 인증을 위한 액세스 토큰.
   * @param {Object} params.updateData - 업데이트할 할 일의 데이터.
   * @param {number} params.updateData.id - 업데이트할 할 일의 ID (필수).
   * @param {string} [params.updateData.content] - 할 일의 새로운 내용 (선택적).
   * @param {number} [params.updateData.categoryId] - 할 일의 새로운 카테고리 ID (선택적).
   * @param {string} [params.updateData.startDate] - 할 일의 새로운 시작 날짜 (YYYY-MM-DD 형식, 선택적).
   * @param {string} [params.updateData.endDate] - 할 일의 새로운 종료 날짜 (YYYY-MM-DD 형식, 선택적).
   * @param {string} [params.updateData.order] - 할 일의 새로운 순서 (선택적).
   * @param {boolean} [params.updateData.isCompleted] - 할 일의 새로운 완료 여부 (선택적).

   * 응답 객체 형식:
   * @property {number} id - 업데이트된 할 일의 ID.
   * @property {string} content - 업데이트된 할 일의 내용.
   * @property {number} categoryId - 업데이트된 할 일의 카테고리 ID.
   * @property {string} [startDate] - 업데이트된 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @property {string} [endDate] - 업데이트된 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @property {number} userId - 업데이트된 할 일의 사용자 ID.
   * @property {string} order - 업데이트된 할 일의 순서.
   * @property {boolean} isCompleted - 업데이트된 할 일의 완료 여부.
   */
  updateTodo: ({ accessToken, updateData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.todos, updateData, metadata()),
    );
  },
  /**
   * 서버에 토큰을 검증 요청을 보냅니다.
   *
   * 요청 본문 형식:
   * {
   *   "token": "your_accessToken_here"
   * }
   */
  verifyToken: token => {
    return handleRequest(() => axios.post(API_PATH.verify, { token }));
  },
  /**
   *
   */
  renewToken: (accessToken, refreshToken) => {
    return handleRequest(() =>
      axios.post(API_PATH.renew, {
        refresh: refreshToken,
        access: accessToken,
      }),
    );
  },
  /**
   * Google 로그인 요청을 서버에 보냅니다.
   *
   * @param {Object} tokenData - 로그인에 필요한 토큰 데이터.
   * @param {string} tokenData.token - Google 인증 토큰.
   * @param {string} tokenData.deviceToken - 장치 토큰.

   */
  googleLogin: tokenData => {
    return handleRequest(() => axios.post(API_PATH.login, tokenData));
  },

  getUserInfo: async accessToken => {
    const header = await metadata(accessToken);
    const getUserInfoData = handleRequest(() =>
      axios.get(API_PATH.user, header),
    );
    return getUserInfoData;
  },

  getCategory: (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.categories}?user_id=${userId}`, metadata()),
    );
  },

  /**
   * 서버에 카테고리를 추가합니다.
   *
   * @example
   * // categoryData 예시:
   * {
   *   title: "categoryName",
   *   userId: userId, // int
   *   color: "selectedColor"
   *   order: 일단 프론트에서 보내기 //int
   * }
   */
  addCategory: (accessToken, categoryData) => {
    return handleRequest(
      // () =>
      //   fetch(API_PATH.categories, {
      //     method: 'POST',
      //     headers: metadata(),
      //     body: JSON.stringify(categoryData),
      //   }),
      // axios({
      //   method: 'POST',
      //   headers: metadata(),
      //   url: API_PATH.categories,
      //   data: JSON.stringify(categoryData),
      // }),
      () => axios.post(API_PATH.categories, categoryData, metadata()),
    );
  },
  /**
   * 서버에 서브투두를 추가합니다.
   *
   * @example
   * // subTodoData 예시:
   * {
   *   category_id: categoryId,
   * }
   */
  addSubTodo: (accessToken, subTodoData) => {
    return handleRequest(() =>
      axios.post(API_PATH.subTodos, subTodoData, metadata()),
    );
  },
  /**
   * 서버에 서브투두를 변경합니다.
   *
   * @example
   * // subTodoData 예시:
   * {
   *   sub_id: subTodoId,
   * }
   */
  updateSubTodo: ({ accessToken, updatedData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.subTodos, updatedData, metadata()),
    );
  },
  /**
   * 서버에 서브투두를 삭제합니다.
   *
   * @example
   * // subTodoData 예시:
   * {
   *   sub_id: subTodoId,
   * }
   */
  deleteSubTodo: ({ accessToken, subTodoId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.subTodos,
        method: 'DELETE',
        headers: metadata(),
        data: { subtodoId: subTodoId },
      }),
    );
  },
  /**
   * 서버에 인박스 투두를 추가합니다.
   *
   * @example
   * // inboxTodoData 예시:
   * {
   *   category_id: categoryId,
   * }
   */
  getInboxTodo: (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.inbox}?user_id=${userId}`, metadata()),
    );
  },
  getAndroidClientId: () => {
    return handleRequest(() => axios.get(API_PATH.android));
  },
};
